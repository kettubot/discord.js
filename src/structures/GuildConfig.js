'use strict';

const GuildConfigLogs = require('./GuildConfigLogs')
//const GuildConfigMod = require('./GuildConfigMod')
//const GuildConfigAutomod = require('./GuildConfigAutomod')
//const GuildConfigRoles = require('./GuildConfigRoles')

/**
 * Interfaces with Kettu's configuration for a specific guild.
 */
class GuildConfig {
  /**
   * @param {Guild} guild The guild this config belongs to
   * @param {Object} data The data for the guild config
   */
  constructor(guild, data) {
    /**
     * The guild this manager belongs to
     * @type {Guild}
     */
    this.guild = guild
    
    if (!data) return;

    this._patch(data)
  }

  _patch(data) {
    /**
     * Prefix for the guild
     * @type {string}
     */
    this.prefix = data.prefix || '/'

    /**
     * Whether social command messages are deleted
     * @type {boolean}
     */
    this.sDelete = data.sDelete || false

    /**
     * autoPublish
     * @type {TextChannel[]}
     * @name GuildConfig#autoPublish
     */
    if (data.autoPublish) this.autoPublish = data.autoPublish.map(channel => this.guild.channels.cache.get(channel)).filter(channel => channel)
    else this.autoPublish = []

    /**
     * Log configuration for the guild
     * @type {?GuildConfigLogs}
     * @name GuildConfig#logs
     */
    if (data.logs) this.logs = new GuildConfigLogs(this.guild, data.logs)
    
    /*/*
     * Moderation configuration for the guild
     * @type {?GuildConfigMod}
     * @name GuildConfig#mod
     */
    //if (data.mod) this.mod = new GuildConfigMod(this.guild, data.mod)

    /*/*
     * Automod configuration for the guild
     * @type {?GuildConfigAutomod}
     * @name GuildConfig#automod
     */
    //if (data.automod) this.automod = new GuildConfigAutomod(this.guild, data.automod)

    /*/*
     * Roles configuration for the guild
     * @type {?GuildConfigRoles}
     * @name GuildConfig#roles
     */
    //if (data.roles) this.roles = new GuildConfigRoles(this.guild, data.roles)
  }

  /**
   * Updates the prefix of the guild.
   * @param {string} prefix The new prefix for the guild
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<GuildConfig>}
   * @example
   * // Edit the guild prefix
   * guild.config.setPrefix('k>')
   *  .then(updated => console.log(`Updated guild prefix to ${updated.prefix}`))
   *  .catch(console.error);
   */
  async setPrefix(prefix, moderator) {
    //const modID = this.client.users.resolveID(moderator)
    this.prefix = prefix
    return this
  }

  /**
   * Updates the social delete setting for the guild.
   * @param {boolean} sDelete Whether social command messages are deleted
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<GuildConfig>}
   */
  async setSDelete(sDelete, moderator) {
    //const modID = this.client.users.resolveID(moderator)
    this.sDelete = sDelete
    return this
  }

  /**
   * Updates the auto publish channels for the guild.
   * @param {TextChannel[]} autoPublish The new list of auto publish channels
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<GuildConfig>}
   */
  async setAutoPublish(autoPublish, moderator) {
    //const modID = this.client.users.resolveID(moderator)
    this.autoPublish = autoPublish
    return this
  }
}