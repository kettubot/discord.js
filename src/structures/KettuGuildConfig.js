'use strict';

const KettuGuildConfigLogs = require('./KettuGuildConfigLogs');
const KettuGuildConfigMod = require('./KettuGuildConfigMod');
const KettuGuildConfigRoles = require('./KettuGuildConfigRoles');
const KettuGuildConfigSocial = require('./KettuGuildConfigSocial');

/**
 * Interfaces with Kettu's configuration for a specific guild.
 */
class KettuGuildConfig {
  /**
   * @param {Client} client The parent client
   * @param {Guild} guild The guild this config belongs to
   * @param {Object} data The data for the guild config
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

    /**
     * Log configuration for the guild
     * @type {?KettuGuildConfigLogs}
     * @name KettuGuildConfig#logs
     */
    this.logs = new KettuGuildConfigLogs(this.client, this.guild, {});

    /**
     * Moderation configuration for the guild
     * @type {?KettuGuildConfigMod}
     * @name KettuGuildConfig#mod
     */
    this.mod = new KettuGuildConfigMod(this.client, this.guild, {});

    /**
     * Roles configuration for the guild
     * @type {?KettuGuildConfigRoles}
     * @name KettuGuildConfig#roles
     */
    this.roles = new KettuGuildConfigRoles(this.client, this.guild, {});

    /**
     * Automod configuration for the guild
     * @type {?KettuGuildConfigAutomod}
     * @name KettuGuildConfig#automod
     */
    this.social = new KettuGuildConfigSocial(this.client, this.guild, {});

    if (!data) return;

    this._patch(data);
  }

  _patch(data) {
    /**
     * Prefix for the guild
     * @type {?string}
     */
    this.prefix = data.prefix;

    /**
     * List of commands that are disabled for the guild
     * @type {Array<string>}
     */
    this.disabled = data.disabled || [];

    if (data.logs) this.logs._patch(data.logs);
    if (data.mod) this.mod._patch(data.mod);
    if (data.roles) this.roles._patch(data.roles);
    if (data.social) this.social._patch(data.social);
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
    if (prefix.includes(' ') || prefix.length > 32) throw new Error('INVALID_PREFIX');

    const newdata = await this.client.kettu.api.guilds(this.guild.id).patch({ data: { prefix: prefix } });
    this.guild.kettu._patch(newdata);

    return this;
  }
}

module.exports = KettuGuildConfig;
