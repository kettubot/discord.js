'use strict';

/**
 * Stores configuration for the moderation aspect of Kettu
 */
class GuildConfigMod {
  /**
   * @param {Guild} guild The guild this config belongs to
   * @param {Object} data The 'mod' data for the guild config
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
     * Various moderation-related roles in Kettu's configuration
     * @typedef {Object} GuildConfigModRoles
     * @property {?Role} mute Role assigned to muted users
     * @property {?Role} trusted Users with a lower automod strength
     * @property {?Role} bypass Users with no automod, step up from trusted
     * @property {?Role} helper Role for helpers
     * @property {?Role} mod Role for moderators, step up from helpers
     * @property {?Role} admin Role for admins, step up from moderators
     */

    /**
     * Kettu mod roles configuration
     * @type {GuildConfigModRoles}
     * @name GuildConfigMod#role
     */

    data.role = data.role || {}
    this.role = {}
    const roletypes = ['mute', 'trusted', 'bypass', 'helper', 'mod', 'admin'].filter(type => data.role[type])
    for (const type of roletypes) this.role[type] = data.role[type]


    /**
     * Moderation action logging type
     * * 'log' - simply log the action in the modlog
     * * 'case' - log the action in the modlog as a case
     * @typedef {string} GuildConfigModActionType
     */

    /**
     * Action logging configuration for various moderation actions
     * @typedef {Object} GuildConfigModActions
     * @property {?GuildConfigModActionType} lockchannel
     * @property {?GuildConfigModActionType} lockserver
     * @property {?GuildConfigModActionType} raidmode
     * @property {?GuildConfigModActionType} purge
     * @property {?GuildConfigModActionType} deleteCase
     * @property {?GuildConfigModActionType} editCase
     */

    /**
     * Kettu mod actions configuration
     * @type {GuildConfigModActions}
     * @name GuildConfigMod#action
     */

    data.action = data.action || {}
    this.action = {}
    const actiontypes = ['lockchannel', 'lockserver', 'raidmode', 'purge', 'deleteCase', 'editCase'].filter(type => data.action[type])
    for (const type of actiontypes) this.action[type] = data.action[type]


    /**
     * 
     */

  }

  

}