'use strict';

/**
 * Stores configuration for the roles aspect of Kettu
 */
class KettuGuildConfigRoles {
  /**
   * @param {Guild} guild The guild this config belongs to
   * @param {Object} data The 'roles' data for the guild config
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
     * Available selfroles for this guild
     * @type {Array<Role>}
     * @name KettuGuildConfigRoles#selfroles
     */
    if (data.selfroles) this.selfroles = data.selfroles.map(r => this.guild.roles.cache.get(r));

    /**
     * A reaction role's specific emoji
     * @typedef {Object} KettuGuildConfigRolesReactroleEmoji
     * @property {?Snowflake} id Emoji ID, if a custom emoji
     * @property {?string} name Custom Emoji name, or ASCII emoji value
     * @property {?animated} boolean Animated, if a custom emoji
     */

    /**
     * Configuration for a single reaction role
     * @typedef {Object} KettuGuildConfigRolesReactrole
     * @property {Snowflake} channelID channel ID
     * @property {Snowflake} messageID message ID
     * @property {Role} role The role to add/remove
     * @property {KettuGuildConfigRolesReactroleEmoji} emoji The reaction emoji for this role
     */

    /**
     * Available reactroles for this guild
     * @type {Array<KettuGuildConfigRolesReactrole>}
     * @name KettuGuildConfigRoles#reactroles
     */
    if (data.reactroles) {
      for (const roleconfig of data.reactroles) {
        roleconfig.role = this.guild.roles.cache.get(roleconfig.roleID);
      }

      this.reactroles = data.reactroles;
    }
  }

  // These methods are stubs, so we can ignore some eslint errors.
  /* eslint-disable no-unused-vars, require-await */

  /**
   * Updates the guild's selfroles
   * @param {Array<Role>} selfroles The new selfroles
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigRoles>}
   */

  async setSelfroles(selfroles, moderator) {
    this.selfroles = selfroles;
    return this;
  }

  /**
   * Updates the guild's reactroles
   * @param {Array<KettuGuildConfigRolesReactrole>} reactroles The new reactroles
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigRoles>}
   */

  async setReactroles(reactroles, moderator) {
    this.reactroles = reactroles;
    return this;
  }
}

module.exports = KettuGuildConfigRoles;
