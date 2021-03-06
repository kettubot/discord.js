'use strict';

const EventEmitter = require('events');
const KettuWebSocket = require('./KettuWebSocket');
const KettuImageManager = require('../../managers/KettuImageManager');
const KettuStoreManager = require('../../managers/KettuStoreManager');
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
     * Data store manager for this kettu client
     * @type {KettuStoreManager}
     */
    this.store = new KettuStoreManager(this);

    /**
     * Name of this kettu client (for bot types)
     * @type {string}
     */
    this.name = null;

    /**
     * Allowed guilds for this kettu client (for bot types)
     * @type {Array<Snowflake>}
     */
    this.allowedGuilds = [];

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
     * Discord token
     * @type {?string}
     */
    this.discordToken = null;

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

  _patch(data) {
    if (data.name) this.name = data.name;
    if (data.allowed_guilds) this.allowedGuilds = data.allowed_guilds;

    if (data.token) this.discordToken = data.token;
    if (data.default_prefix) this.defaultPrefix = data.default_prefix;
    if (data.secrets) this.secrets = data.secrets;
    if (data.blacklist) this.blacklist = data.blacklist ?? [];

    if (data.options) {
      for (const opt of Object.keys(data.options)) {
        this.client.options[opt] = data.options[opt];
      }
    }
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
   * @param {string} shard Current shard instance identifier
   * @returns {Promise<string>} Token of the account used
   * @example
   * client.kettu.login('my kettu token');
   */
  async login(token, shard) {
    if (!token || typeof token !== 'string') throw new Error('TOKEN_INVALID');
    if (!shard || typeof shard !== 'string') throw new Error('SHARD_INVALID');
    this.token = token.replace(/^(Bot|Bearer)\s*/i, '');
    this.shard = shard;
    this.emit(
      KettuEvents.DEBUG,
      `Provided token: ${token
        .split('.')
        .map((val, i) => (i > 1 ? val.replace(/./g, '*') : val))
        .join('.')}
      Provided shard: ${shard}`,
    );

    this.emit(KettuEvents.DEBUG, 'Preparing to connect to kAPI gateway...');
    await this.ws.connect();

    if (this.discordToken) {
      this.emit(KettuEvents.DEBUG, 'Connected to kAPI, starting Discord client...');

      try {
        await this.client.login(this.discordToken);
        return this.token;
      } catch (error) {
        this.destroy();
        throw error;
      }
    } else {
      this.emit(KettuEvents.DEBUG, 'Connected to kAPI, ready to start Discord client.');
      return true;
    }
  }

  /**
   * A string to identify a specific shard of kettu
   * ```
   * If we have the data 'Njk4MDM4MTQ4MDU1MzAyMTc0LjAuMS4xNjI0MDcxMDk0MjE1' we can Base64 decode it:
   *
   * 698038148055302174.  0.     1.          1624071094215
   * bot id of shard      shard  num_shards  timestamp
   * ```
   * @typedef {string} KettuShardIdentifierFull
   */

  /**
   * A string to identify a specific shard of kettu
   * Takes the format of a {@link KettuShardIdentifierFull}, but without the trailing timestamp
   * @typedef {string} KettuShardIdentifier
   */

  /**
   * A shard's result from a kettu broadcast eval
   * @typedef {Object} KettuBroadcastEvalResult
   * @property {KettuShardIdentifier} shard Shard this result belongs to
   * @property {?*} result The returned data, none may be present if `undefined`
   */

  /**
   * Options for a kettu broadcast eval of any type
   * @typedef {Object} KettuBroadcastEvalOptions
   * @property {?number} abort Time (in ms) to wait before aborting the eval client-side
   * @property {?number} timeout Time (in ms) to wait for a shard to respond server-side
   * @property {?Array<KettuShardIdentifier|KettuShardIdentifierFull>} shards Shards to send the request to (null will
   * default to all connected shards)
   */

  /**
   * Fetches a property from all other connected shards
   * @param {string} query Value to fetch
   * @param {KettuBroadcastEvalOptions} options Broadcast options
   * @returns {Promise<Array<KettuBroadcastEvalResult>>}
   * @example
   * client.kettu.login('my kettu token');
   * const values = await client.kettu.broadcastProperty('client.guilds.cache.size')
   * console.log(values.reduce((total, current) => total + current.result, 0))
   */
  broadcastEvalProperty(query, options) {
    if (!this.client?.user?.id) throw new Error('Discord Client not yet connected');
    return this.api.kettu(this.client.user.id).eval.post({ data: { type: 0, query, ...options } });
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
