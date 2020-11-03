'use strict';

/**
 * Stores configuration for the logging aspect of Kettu
 */
class KettuGuildConfigLogs {
  /**
   * @param {Guild} guild The guild this config belongs to
   * @param {Object} data The 'logs' data for the guild config
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
     * A style of message
     * * GIDDY
     * * YOU
     * * NEED
     * * TO
     * * PLAN
     * * THIS
     * @typedef {string} ResponseStyle
     */

    /**
     * A user-customisable message, with a text & embed portion
     * @typedef {Object} CustomResponse
     * @property {?string} message Text message to send
     * @property {?MessageEmbed} embed Embed to send
     */

    /**
     * A user-customisable message, with a text & embed portion, and in a specified channel
     * @typedef {Object} CustomResponseChannel
     * @property {?string} message Text message to send
     * @property {?MessageEmbed} embed Embed to send
     * @property {TextChannel} channel Channel to send the response in
     */

    /**
     * The message style type for logs
     * @type {ResponseStyle}
     */
    this.type = data.type;

    /**
     * Channel for join logs
     * @type {?TextChannel}
     * @name KettuGuildConfigLogs#join
     */
    if (data.join) this.join = this.guild.channels.cache.get(data.join);

    /**
     * Channel for leave logs
     * @type {?TextChannel}
     * @name KettuGuildConfigLogs#leave
     */
    if (data.leave) this.leave = this.guild.channels.cache.get(data.leave);

    /**
     * Join DM configuration
     * @type {?CustomResponse}
     * @name KettuGuildConfigLogs#joinDM
     */
    if (data.joinDM) this.joinDM = data.joinDM;

    /**
     * Join message configuration
     * @type {?CustomResponseChannel}
     * @name KettuGuildConfigLogs#joinMessage
     */
    if (data.joinMessage && data.joinMessage.channel) {
      this.joinMessage = data.joinMessage;
      this.joinMessage.channel = this.guild.channels.cache.get(this.joinMessage.channel);
    }

    /**
     * Leave message configuration
     * @type {?CustomResponseChannel}
     * @name KettuGuildConfigLogs#leaveMessage
     */
    if (data.leaveMessage && data.leaveMessage.channel) {
      this.leaveMessage = data.leaveMessage;
      this.leaveMessage.channel = this.guild.channels.cache.get(this.leaveMessage.channel);
    }

    /**
     * Channel for vc logs
     * @type {?TextChannel}
     * @name KettuGuildConfigLogs#vc
     */
    if (data.vc) this.vc = this.guild.channels.cache.get(data.vc);

    /**
     * Channel for messageDelete logs
     * @type {?TextChannel}
     * @name KettuGuildConfigLogs#messageDelete
     */
    if (data.messageDelete) this.messageDelete = this.guild.channels.cache.get(data.messageDelete);

    /**
     * Channel for messageEdit logs
     * @type {?TextChannel}
     * @name KettuGuildConfigLogs#messageEdit
     */
    if (data.messageEdit) this.messageEdit = this.guild.channels.cache.get(data.messageEdit);

    /**
     * Channel for role logs
     * @type {?TextChannel}
     * @name KettuGuildConfigLogs#role
     */
    if (data.role) this.role = this.guild.channels.cache.get(data.role);

    /**
     * Channel for nickname logs
     * @type {?TextChannel}
     * @name KettuGuildConfigLogs#nickname
     */
    if (data.nickname) this.nickname = this.guild.channels.cache.get(data.nickname);

    /**
     * Channel for mod logs
     * @type {?TextChannel}
     * @name KettuGuildConfigLogs#mod
     */
    if (data.mod) this.mod = this.guild.channels.cache.get(data.mod);

    /**
     * Channel for automod logs
     * @type {?TextChannel}
     * @name KettuGuildConfigLogs#automod
     */
    if (data.automod) this.automod = this.guild.channels.cache.get(data.automod);
  }

  // These methods are stubs, so we can ignore some eslint errors.
  /* eslint-disable no-unused-vars, require-await */

  /**
   * Updates the message response style for the logs.
   * @param {ResponseStyle} type The new message response style
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   * @example
   * // Edit the guild's response style for logs
   * guild.kettu.config.logs.setType('embed')
   *  .then(updated => console.log(`Updated type to ${updated.type}`))
   *  .catch(console.error);
   */
  async setType(type, moderator) {
    this.type = type;
    return this;
  }

  /**
   * Updates the channel for join logs.
   * @param {GuildChannelResolvable} channel The new channel
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   */
  async setJoin(channel, moderator) {
    this.join = this.client.channels.resolve(channel);
    return this;
  }

  /**
   * Updates the channel for leave logs.
   * @param {GuildChannelResolvable} channel The new channel
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   */
  async setLeave(channel, moderator) {
    this.leave = this.client.channels.resolve(channel);
    return this;
  }

  /**
   * Updates the join DM message.
   * @param {CustomResponse} response The new custom message
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   * @example
   * // Edit the guild's join DM
   * const embed = new Discord.MessageEmbed()
   *  .setTitle('welcome to our server')
   *  .setDescription('and enjoy your stay')
   * guild.kettu.config.logs.setJoinDM({ text: 'welcome!', embed: embed }, message.member)
   *  .then(updated => console.log(`Updated dm to ${updated.joinDM}`))
   *  .catch(console.error);
   */
  async setJoinDM(response, moderator) {
    if (response.text) {
      this.joinMessage.text = response.text;
    }

    if (response.embed) {
      this.joinMessage.embed = response.embed;
    }

    return this;
  }

  /**
   * Updates the public member join message.
   * @param {CustomResponseChannel} response The new custom message & channel
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   * @example
   * // Edit the guild's join message
   * const embed = new Discord.MessageEmbed()
   *  .setTitle('welcome {tag} to our server')
   *  .setDescription('head to #rules to read through our rules!')
   * const newJoinMessage = { channel: message.channel, text: 'welcome {mention}!', embed: embed }
   * guild.kettu.config.logs.setJoinMessage(newJoinMessage, message.member)
   *  .then(updated => console.log(`Updated welcome message to ${updated.joinMessage}`))
   *  .catch(console.error);
   */
  async setJoinMessage(response, moderator) {
    if (response.channel) {
      this.joinMessage.channel = this.client.channels.resolve(response.channel);
    }

    if (response.text) {
      this.joinMessage.text = response.text;
    }

    if (response.embed) {
      this.joinMessage.embed = response.embed;
    }

    return this;
  }

  /**
   * Updates the public member leave message.
   * @param {CustomResponseChannel} response The new custom message & channel
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   * @example
   * // Edit the guild's leave embed, and remove the text
   * const embed = new Discord.MessageEmbed()
   *  .setTitle('{tag} has left the server')
   * guild.kettu.config.logs.setLeaveMessage({ channel: message.channel, embed: embed, text: null }, message.member)
   *  .then(updated => console.log(`Updated leave message to ${updated.leaveMessage}`))
   *  .catch(console.error);
   */
  async setLeaveMessage(response, moderator) {
    if (response.channel !== undefined) {
      this.leaveMessage.channel = this.client.channels.resolve(response.channel);
    }

    if (response.text !== undefined) {
      this.leaveMessage.text = response.text;
    }

    if (response.embed !== undefined) {
      this.leaveMessage.embed = response.embed;
    }

    return this;
  }

  /**
   * Updates the channel for vc logs.
   * @param {GuildChannelResolvable} channel The new channel
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   */
  async setVC(channel, moderator) {
    this.vc = this.client.channels.resolve(channel);
    return this;
  }

  /**
   * Updates the channel for message delete logs.
   * @param {GuildChannelResolvable} channel The new channel
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   */
  async setMessageDelete(channel, moderator) {
    this.messageDelete = this.client.channels.resolve(channel);
    return this;
  }

  /**
   * Updates the channel for message edit logs.
   * @param {GuildChannelResolvable} channel The new channel
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   */
  async setMessageEdit(channel, moderator) {
    this.messageEdit = this.client.channels.resolve(channel);
    return this;
  }

  /**
   * Updates the channel for role logs.
   * @param {GuildChannelResolvable} channel The new channel
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   */
  async setRole(channel, moderator) {
    this.role = this.client.channels.resolve(channel);
    return this;
  }

  /**
   * Updates the channel for nickname logs.
   * @param {GuildChannelResolvable} channel The new channel
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   */
  async setNickname(channel, moderator) {
    this.nickname = this.client.channels.resolve(channel);
    return this;
  }

  /**
   * Updates the channel for mod logs.
   * @param {GuildChannelResolvable} channel The new channel
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   */
  async setMod(channel, moderator) {
    this.mod = this.client.channels.resolve(channel);
    return this;
  }

  /**
   * Updates the channel for automod logs.
   * @param {GuildChannelResolvable} channel The new channel
   * @param {GuildMemberResolvable} moderator Moderator responsible for the change
   * @returns {Promise<KettuGuildConfigLogs>}
   */
  async setAutomod(channel, moderator) {
    this.automod = this.client.channels.resolve(channel);
    return this;
  }
}

module.exports = KettuGuildConfigLogs;
