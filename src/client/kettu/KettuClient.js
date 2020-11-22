'use strict';

const EventEmitter = require('events');
const KettuImageManager = require('../../managers/KettuImageManager');
const { KettuEvents } = require('../../util/Constants');

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
     * Image manager for this kettu client
     * @type {KettuImageManager}
     */
    this.images = new KettuImageManager(this);

    /**
     * Blacklist data for this kettu client
     * @type {Array<KettuBlacklist>}
     */
    this.blacklist = [];

    /**
     * Secrets for this client
     * @type {Object}
     */
    this.secrets = {};
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
    this.token = token = token.replace(/^(Bot|Bearer)\s*/i, '');
    this.emit(
      KettuEvents.DEBUG,
      `Provided token: ${token
        .split('.')
        .map((val, i) => (i > 1 ? val.replace(/./g, '*') : val))
        .join('.')}`,
    );

    this.emit(KettuEvents.DEBUG, 'Preparing to connect to the gateway...');
    this.emit(KettuEvents.DEBUG, 'Pretended to connect, starting Discord client...');

    try {
      await this.client.login(token);
      return this.token;
    } catch (error) {
      this.destroy();
      throw error;
    }
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
