'use strict';

/**
 * A specific user's blacklist data
 */
class KettuBlacklist {
  /**
   * @param {KettuClient} client The client this blacklist belongs to
   * @param {Object} data Blacklist data
   */
  constructor(client, data) {
    /**
     * The client this blacklist belongs to
     * @type {KettuClient}
     */
    this.client = client;

    /**
     * ID of the blacklisted user
     * @type {string}
     */
    this.id = data.id;

    /**
     * Timestamp of the blacklist
     * @type {?number}
     */
    if (data.date) this.date = data.date;

    /**
     * Duration of the blacklist
     * @type {?number}
     */
    if (data.time) this.time = data.time;

    /**
     * Reason for the blacklist
     * @type {string}
     */
    if (data.reason) this.reason = data.reason;

    /**
     * URL for an image relating to the reason
     * @type {string}
     */
    if (data.image) this.image = data.image;
  }
}

module.exports = KettuBlacklist;
