'use strict';

const MOD_ROLES = ['mute', 'trusted', 'bypass', 'helper', 'mod', 'admin'];
const MOD_ACTIONS = ['lockchannel', 'lockserver', 'raidmode', 'purge', 'deleteCase', 'editCase'];
const MOD_ACTION_TYPES = ['log', 'case'];
const MOD_CONFIRM_LEVELS = ['none', 'mass', 'all'];

/**
 * Stores configuration for the moderation aspect of Kettu
 */
class KettuGuildConfigMod {
  /**
   * @param {Guild} guild The guild this config belongs to
   * @param {Object} data The 'mod' data for the guild config
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
     * Various moderation-related roles in Kettu's configuration
     * @typedef {Object} KettuGuildConfigModRoles
     * @property {?Role} mute Role assigned to muted users
     * @property {?Role} trusted Users with a lower automod strength
     * @property {?Role} bypass Users with no automod, step up from trusted
     * @property {?Role} helper Role for helpers
     * @property {?Role} mod Role for moderators, step up from helpers
     * @property {?Role} admin Role for admins, step up from moderators
     */

    /**
     * Kettu mod roles configuration
     * @type {KettuGuildConfigModRoles}
     * @name KettuGuildConfigMod#role
     */

    data.role = data.role || {};
    this.role = {};
    const roletypes = MOD_ROLES.filter(type => data.role[type]);
    for (const type of roletypes) this.role[type] = data.role[type];

    /**
     * Moderation action logging type
     * * 'log' - simply log the action in the modlog
     * * 'case' - log the action in the modlog as a case
     * @typedef {string} KettuGuildConfigModActionType
     */

    /**
     * Action logging configuration for various moderation actions
     * @typedef {Object} KettuGuildConfigModActions
     * @property {?KettuGuildConfigModActionType} lockchannel
     * @property {?KettuGuildConfigModActionType} lockserver
     * @property {?KettuGuildConfigModActionType} raidmode
     * @property {?KettuGuildConfigModActionType} purge
     * @property {?KettuGuildConfigModActionType} deleteCase
     * @property {?KettuGuildConfigModActionType} editCase
     */

    /**
     * Kettu mod actions configuration
     * @type {KettuGuildConfigModActions}
     * @name KettuGuildConfigMod#action
     */

    data.action = data.action || {};
    this.action = {};
    const actiontypes = MOD_ACTIONS.filter(type => data.action[type]);
    for (const type of actiontypes) this.action[type] = data.action[type];

    /**
     * Configuration for mod-related automated dms
     * @typedef {Object} KettuGuildConfigModDM
     * @property {boolean} dm Whether dms are enabled, false should be assumed if the object doesn't exist
     * @property {?boolean} showMod Whether the specific responsible mod is shown
     * @property {?string} appeals Link to an appeals page
     */

    /**
     * Kettu mod dm configuration
     * @type {?KettuGuildConfigModDM}
     * @name KettuGuildConfigMod#dm
     */
    if (data.dm) {
      this.dm = { dm: data.dm.dm };
      this.dm.showMod = Boolean(data.dm);
      if (data.appeals) this.dm.appeals = data.appeals;
    }

    /**
     * The message style type for moderation
     * @type {ResponseStyle}
     */
    this.type = data.type;

    /**
     * Whether to delete mod commands
     * @type {boolean}
     */
    this.deleteCmd = data.deleteCmd;

    /**
     * Whether to automatically delete mod errors? idk what this is actually for haha
     * @type {boolean}
     */
    this.deleteErr = data.deleteErr;

    /**
     * Moderation confirmation level
     * * 'none' - never confirm moderator actions
     * * 'mass' - confirm only mass moderator actions
     * * 'all' - confirm all moderator actions
     * @typedef {string} KettuGuildConfigModConfirmLevel
     */

    /**
     * At which level to confirm mod actions
     * @type {KettuGuildConfigModConfirmLevel}
     */
    this.confirm = data.confirm;
  }

  // These methods are stubs, so we can ignore some eslint errors.
  /* eslint-disable no-unused-vars, require-await */

  /**
   * Updates a mod role for the guild.
   * @param {string} name Which role to update
   * @param {RoleResolvable} role The new role to set
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigMod>}
   * @example
   * // Edit a guild's muted role
   * guild.kettu.config.mod.setRole('mute', msg.mentions.roles.first(), msg.member)
   *  .then(updated => console.log(`Updated muted role to <@${updated.role.mute}>`))
   *  .catch(console.error);
   */

  async setRole(name, role, moderator) {
    if (!MOD_ROLES.includes(name)) throw new Error('UNKNOWN_ROLE_TYPE');

    const newroleid = this.guild.roles.resolveID(role);
    if (!newroleid) throw new Error('INVALID_ROLE');

    this.role[name] = newroleid;

    return this;
  }

  /**
   * Updates a mod action type.
   * @param {string} action Which action to update
   * @param {KettuGuildConfigModActionType} type The new action type
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigMod>}
   */

  async setAction(action, type, moderator) {
    if (!MOD_ACTIONS.includes(action)) throw new Error('UNKNOWN_ACTION');
    if (!MOD_ACTION_TYPES.includes(type)) throw new Error('UNKNOWN_ACTION_TYPE');

    this.action[action] = type;

    return this;
  }

  /**
   * Updates the dm configuration
   * @param {boolean} enabled Whether user dms are enabled on mod actions
   * @param {boolean} showMod Whether dms should show which moderator executed the action
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigMod>}
   */

  async setDM(enabled, showMod, moderator) {
    this.dm.dm = Boolean(enabled);
    this.dm.showMod = Boolean(showMod);

    return this;
  }

  /**
   * Updates the message response style for moderator actions.
   * @param {ResponseStyle} type The new message response style
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigMod>}
   */
  async setType(type, moderator) {
    this.type = type;
    return this;
  }

  /**
   * Updates the 'deleteCmd' option
   * @param {boolean} deleteCmd New value
   * @param {GuildMemberResolvable} moderator Moderator responsible for this change
   * @returns {Promise<KettuGuildConfigMod>}
   */
  async setDeleteCmd(deleteCmd, moderator) {
    this.deleteCmd = Boolean(deleteCmd);
    return this;
  }

  /**
   * Updates the 'deleteErr' option
   * @param {boolean} deleteErr New value
   * @param {GuildMemberResolvable} moderator Moderator responsible for this change
   * @returns {Promise<KettuGuildConfigMod>}
   */
  async setDeleteErr(deleteErr, moderator) {
    this.deleteErr = Boolean(deleteErr);
    return this;
  }

  /**
   * Update the moderation confirmation leve
   * @param {KettuGuildConfigModConfirmLevel} level New level
   * @param {GuildMemberResolvable} moderator Moderator responsible for this change
   * @returns {Promise<KettuGuildConfigMod>}
   */
  async setConfirm(level, moderator) {
    if (!MOD_CONFIRM_LEVELS.includes(level)) throw new Error('INVALID_CONFIRM_LEVEL');
    this.confirm = level;
    return this;
  }
}

module.exports = KettuGuildConfigMod;
