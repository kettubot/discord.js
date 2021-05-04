'use strict';

const EventEmitter = require('events');
const KettuWebSocket = require('./KettuWebSocket');
const KettuImageManager = require('../../managers/KettuImageManager');
const KettuRESTManager = require('../../rest/kettu/KettuRESTManager');
const { KettuEvents, ShardEvents } = require('../../util/Constants');

const UNRECOVERABLE_CLOSE_CODES = [4004, 4012, 4013, 4014];
const UNRESUMABLE_CLOSE_CODES = [4007, 4009, 4010];

/**
 * A custom client for interacting with the Kettu API, extending into native d.js objects.
 * @extends {EventEmitter}
 */
class KettuClient extends EventEmitter {
  constructor(client) {
    super();

    /**
     * The client that instantiated this KettuClient
     * @type {Client}
     * @readonly
     * @name KettuClient#client
     */
    Object.defineProperty(this, 'client', { value: client });

    /**
     * WebSocket for this kettu client
     * @type {KettuWebSocket}
     */
    this.ws = new KettuWebSocket(this);

    /**
     * Image manager for this kettu client
     * @type {KettuImageManager}
     */
    this.images = new KettuImageManager(this);

    /**
     * Blacklisted users for this Kettu client
     * @type {Array<Snowflake>}
     */
    this.blacklist = [];

    /**
     * Token
     * @type {?string}
     */
    this.token = null;

    /**
     * Default prefix for this client
     * @type {?string}
     */
    this.defaultPrefix = null;

    /**
     * Secrets for this client
     * @type {Object}
     */
    this.secrets = {};

    /**
     * Kettu's REST manager of the client
     * @type {KettuRESTManager}
     * @private
     */
    this.rest = new KettuRESTManager(this);

    this.attachWSListeners();
  }

  /**
   * The kAPI shortcut
   * @type {Object}
   * @readonly
   * @private
   */
  get api() {
    return this.rest.api;
  }

  /**
   * This Kettu Client's options
   * @type {Object}
   * @readonly
   */
  get options() {
    return this.client.options.kettuOptions;
  }

  /**
   * Logs the Kettu client in, and then the Discord client
   * @param {string} token Token of the (Kettu) account to log in with
   * @returns {Promise<string>} Token of the account used
   * @example
   * client.kettu.login('my kettu token');
   */
  async login(token) {
    if (!token || typeof token !== 'string') throw new Error('TOKEN_INVALID');
    this.token = token.replace(/^(Bot|Bearer)\s*/i, '');
    this.emit(
      KettuEvents.DEBUG,
      `Provided token: ${token
        .split('.')
        .map((val, i) => (i > 1 ? val.replace(/./g, '*') : val))
        .join('.')}`,
    );

    this.emit(KettuEvents.DEBUG, 'Preparing to connect to kAPI gateway...');
    const discord_token = await this.ws.connect();
    this.emit(KettuEvents.DEBUG, 'Connected to kAPI, starting Discord client...');

    try {
      await this.client.login(discord_token);
      return this.token;
    } catch (error) {
      this.destroy();
      throw error;
    }
  }

  attachWSListeners() {
    this.ws.on(ShardEvents.READY, () => {
      /**
       * Emitted when the client's Kettu connection becomes ready.
       * @event KettuClient#ready
       */
      this.emit(KettuEvents.READY);
    });

    this.ws.on(ShardEvents.CLOSE, event => {
      if (event.code === 1000 ? this.destroyed : UNRECOVERABLE_CLOSE_CODES.includes(event.code)) {
        /**
         * Emitted when kettu's websocket becomes disconnected and won't reconnect.
         * This will also destroy the Discord connection.
         * @event KettuClient#disconnected
         * @param {CloseEvent} event The WebSocket close event
         */
        this.emit(KettuEvents.DISCONNECTED, event);
        this.client.destroy();
        return;
      }

      if (UNRESUMABLE_CLOSE_CODES.includes(event.code)) {
        // These event codes cannot be resumed
        this.ws.sessionID = null;
      }

      /**
       * Emitted when the kettu connection is attempting to reconnect or re-identify.
       * @event KettuClient#reconnecting
       */
      this.emit(KettuEvents.RECONNECTING);

      if (!this.ws.sessionID) this.ws.destroy({ reset: true, emit: false, log: false });

      setTimeout(() => this.ws.connect(), 5000);
    });

    this.ws.on(ShardEvents.INVALID_SESSION, () => {
      this.emit(KettuEvents.RECONNECTING);
      this.ws.destroy({ reset: true, emit: false, log: false });

      setTimeout(() => this.ws.connect(), 5000);
    });

    this.ws.on(ShardEvents.DESTROYED, () => {
      this.emit(KettuEvents.RECONNECTING);

      setTimeout(() => this.ws.connect(), 5000);
    });
  }

  /**
   * Logs out, terminates the connection to kAPI & Discord, and destroys the client.
   * @returns {void}
   */
  destroy() {
    this.client.destroy();
    this.token = null;
  }

  toJSON() {
    return super.toJSON({
      readyAt: false,
    });
  }
}

module.exports = KettuClient;
