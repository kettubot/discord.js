'use strict';

/**
 * Stores configuration for the social aspect of Kettu
 */
class KettuGuildConfigSocial {
  /**
   * @param {Client} client The parent client
   * @param {Guild} guild The guild this config belongs to
   * @param {Object} data The 'social' data for the guild config
   */
  constructor(client, guild, data) {
    /**
     * The parent client
     * @type {Client}
     */
    this.client = client;

    /**
     * The guild this manager belongs to
     * @type {Guild}
     */
    this.guild = guild;

    if (!data) return;

    this._patch(data);
  }

  _patch(data) {
    /**
     * Whether social command trigger messages are deleted
     * @type {boolean}
     */
    this.sDelete = Boolean(data.sDelete);

    /**
     * A social image that is blacklisted in a guild
     * @typedef {Object} KettuGuildConfigSocialBlacklistedImage
     * @property {number} id Image ID
     * @property {string} category Image category
     */

    /**
     * Blacklisted social command images for this server
     * @type {Array<KettuGuildConfigSocialBlacklistedImage>}
     */
    this.blacklist = data.blacklist || [];
  }

  // These methods are stubs, so we can ignore some eslint errors.
  /* eslint-disable no-unused-vars, require-await */

  /**
   * Updates the guild's sDelete property
   * @param {boolean} sDelete The new value
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigSocial>}
   */

  async setSDelete(sDelete, moderator) {
    this.sDelete = sDelete;
    return this;
  }

  /**
   * Updates the guild's blacklisted images
   * @param {Array<KettuGuildConfigSocialBlacklistedImage>} blacklist The new blacklist
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigSocial>}
   */

  async setBlacklist(blacklist, moderator) {
    this.blacklist = blacklist;
    return this;
  }
}

module.exports = KettuGuildConfigSocial;
