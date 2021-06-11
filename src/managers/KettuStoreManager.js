'use strict';

/**
 * Manager for interfacing with Kettu's data store
 */
class KettuStoreManager {
  constructor(client) {
    /**
     * The kettu client that instantiated this manager
     * @type {KettuClient}
     * @readonly
     */
    this.client = client;
  }

  /**
   * Writes data to the data store
   * @param {string} key Key to write data to
   * @param {*} data JSON data to write
   * @returns {Promise}
   */
  set(key, data) {
    return this.client.api.users('@me').store(key).post({ data });
  }

  /**
   * Retrieves data from the data store
   * @param {string} key Key to retrieve data from
   * @returns {Promise<*>}
   */
  fetch(key) {
    return this.client.api.users('@me').store(key).get();
  }

  /**
   * Removes data from the data store
   * @param {string} key Key to delete data from
   * @returns {Promise}
   */
  destroy(key) {
    return this.client.api.users('@me').store(key).delete();
  }
}

module.exports = KettuStoreManager;
