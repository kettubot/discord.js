'use strict';

const KettuGuildConfigLogs = require('./KettuGuildConfigLogs');
const KettuGuildConfigMod = require('./KettuGuildConfigMod');

/**
 * Interfaces with Kettu's configuration for a specific guild.
 */
class KettuGuildConfig {
  /**
   * @param {Guild} guild The guild this config belongs to
   * @param {Object} data The data for the guild config
   */
  constructor(guild, data) {
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
     * Prefix for the guild
     * @type {string}
     */
    this.prefix = data.prefix || '/';

    /**
     * Whether social command messages are deleted
     * @type {boolean}
     */
    this.sDelete = data.sDelete || false;

    /**
     * List of autoPublish channels
     * @type {TextChannel[]}
     * @name KettuGuildConfig#autoPublish
     */
    if (data.autoPublish) {
      this.autoPublish = data.autoPublish.map(channel => this.guild.channels.cache.get(channel));
      this.autoPublish = this.autoPublish.filter(channel => channel);
    } else {
      this.autoPublish = [];
    }

    /**
     * Log configuration for the guild
     * @type {?KettuGuildConfigLogs}
     * @name KettuGuildConfig#logs
     */
    if (data.logs) this.logs = new KettuGuildConfigLogs(this.guild, data.logs);

    /**
     * Moderation configuration for the guild
     * @type {?KettuGuildConfigMod}
     * @name KettuGuildConfig#mod
     */
    if (data.mod) this.mod = new KettuGuildConfigMod(this.guild, data.mod);

    // Temporarily disable for development
    /* eslint-disable spaced-comment */

    /*/*
     * Automod configuration for the guild
     * @type {?KettuGuildConfigAutomod}
     * @name KettuGuildConfig#automod
     */
    //if (data.automod) this.automod = new KettuGuildConfigAutomod(this.guild, data.automod)

    /*/*
     * Roles configuration for the guild
     * @type {?KettuGuildConfigRoles}
     * @name KettuGuildConfig#roles
     */
    //if (data.roles) this.roles = new KettuGuildConfigRoles(this.guild, data.roles)
  }

  // These methods are stubs, so we can ignore some eslint errors.
  /* eslint-disable no-unused-vars, require-await */

  /**
   * Updates the prefix of the guild.
   * @param {string} prefix The new prefix for the guild
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfig>}
   * @example
   * // Edit the guild prefix
   * guild.kettu.config.setPrefix('k>')
   *  .then(updated => console.log(`Updated guild prefix to ${updated.prefix}`))
   *  .catch(console.error);
   */
  async setPrefix(prefix, moderator) {
    this.prefix = prefix;
    return this;
  }

  /**
   * Updates the social delete setting for the guild.
   * @param {boolean} sDelete Whether social command messages are deleted
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfig>}
   */
  async setSDelete(sDelete, moderator) {
    this.sDelete = sDelete;
    return this;
  }

  /**
   * Updates the auto publish channels for the guild.
   * @param {TextChannel[]} autoPublish The new list of auto publish channels
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfig>}
   */
  async setAutoPublish(autoPublish, moderator) {
    this.autoPublish = autoPublish;
    return this;
  }
}

module.exports = KettuGuildConfig;
