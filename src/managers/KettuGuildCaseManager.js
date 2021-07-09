'use strict';

const CachedManager = require('./CachedManager');
const KettuGuildCase = require('../structures/KettuGuildCase');

/**
 * Manager for interfacing with cases in a specific guild
 * @extends {CachedManager}
 */
class KettuGuildCaseManager extends CachedManager {
  constructor(guild, iterable) {
    super(guild.client, KettuGuildCase, iterable);

    /**
     * The guild this manager belongs to
     * @type {Guild}
     */
    this.guild = guild;
  }

  /**
   * The cache of this Manager
   * @type {Collection<number, KettuGuildCase>}
   * @name KettuGuildCaseManager#cache
   */

  _add(data, cache = true) {
    return super._add(data, cache, { id: data.id, extras: [this.guild] });
  }

  /**
   * Data that resolves to give a KettuGuildCase object. This can be:
   * * A KettuGuildCase object
   * * A number (id)
   * @typedef {KettuGuildCase|number} KettuGuildCaseResolvable
   */

  /**
   * Resolves a {@link KettuGuildCaseResolvable} to a {@link KettuGuildCase} object.
   * @param {KettuGuildCaseResolvable} caseData The case resolvable
   * @returns {?KettuGuildCase}
   */
  resolve(caseData) {
    if (caseData instanceof KettuGuildCase) return caseData;
    if (typeof caseData === 'number') return this.cache.get(caseData) || null;
    return null;
  }

  /**
   * Resolves a {@link KettuGuildCaseResolvable} to a case id number.
   * @param {KettuGuildCaseResolvable} caseData The case resolvable
   * @returns {?number}
   */
  resolveId(caseData) {
    if (caseData instanceof KettuGuildCase) return caseData.id;
    if (typeof caseData === 'number') return caseData;
    return null;
  }

  /**
   * Fetches a specific case from kAPI or the cache
   * @param {number} id ID of the case
   * @param {boolean} [cache=true] Whether to cache the new channel objects if it weren't already
   * @param {boolean} [force=false] Whether to skip the cache check and request the API
   * @returns {Promise<?KettuGuildCase>}
   */
  fetch(id, cache = true, force = false) {
    if (id && !force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    return this.client.kettu.api
      .guilds(this.guild.id)
      .cases(id)
      .get()
      .then(data => this._add(data, cache));
  }

  /**
   * Fetches all cases for this guild
   * @param {boolean} [cache=true] Whether to cache the new channel objects if it weren't already
   * @returns {Promise<Collection<number, KettuGuildCase>>}
   */
  async fetchAll() {
    const cases = await this.client.kettu.api.guilds(this.guild.id).cases.get();
    this.cache.clear();
    for (const casedata of cases) this._add(casedata);
    return this.cache;
  }

  /**
   * A key which marks a reserved kettu case number, and can be used to create that case
   * @typedef {string} KettuGuildCaseKey
   */

  /**
   * Reserves a case number for a case to be created in the future
   * @returns {Promise<KettuGuildCaseKey>}
   */
  async reserve() {
    const data = await this.client.kettu.api.guilds(this.guild.id).cases.reserve.post();
    return data.key;
  }

  /**
   * Creates a case
   * @param {KettuGuildCaseType} type The case type
   * @param {Object} [data] The case data
   * @param {string} [data.reason] Reason
   * @param {Message} [data.log] Log message
   * @param {Message} [data.context] Context message
   * @param {UserResolvable} [data.user] Target user (required for ban, kick, and mute)
   * @param {ChannelResolvable} [data.channel] Target channel (required for lockchannel, lockcategory, purge and
   *  slowmode)
   * @param {boolean|string} [data.userDM] Either `true` or a reason the dm failed to send (required for ban, kick
   *  and mute)
   * @param {number} [data.strikes] Number of strikes (optional for kick and mute)
   * @param {number} [data.time] Duration of case (optional for lockchannel, lockcategory, lockserver, ban, mute,
   *  raidmode and slowmode)
   * @param {Object} [data.meta] Other metadata (required for raidmode, purge, editcase, deletecase and slowmode)
   * @param {GuildMemberResolvable} [moderator] Moderator responsible for the case
   * @param {KettuGuildCaseKey} [key] Key to use to fulfil a case reservation
   * @returns {Promise<KettuGuildCase>}
   */
  async create(type, data = {}, moderator, key) {
    const reqdata = { type };
    if (data.reason) reqdata.reason = data.reason;
    if (data.log) reqdata.log = { message_id: data.log.id, channel_id: data.log.channel.id };
    if (data.context) reqdata.context = { message_id: data.context.id, channel_id: data.context.channel.id };
    if (data.user) {
      const user = this.client.users.resolveId(data.user);
      if (user) reqdata.user_id = user;
    }
    if (data.channel) {
      const channel = this.client.channels.resolveId(data.channel);
      if (channel) reqdata.channel_id = channel;
    }
    if (data.userDM) reqdata.user_dm = data.userDM;
    if (data.strikes) reqdata.strikes = data.strikes;
    if (data.time) reqdata.time = data.time;
    if (data.meta) reqdata.meta = data.meta;

    const mod = this.guild.members.resolveId(moderator);
    if (!mod) throw new Error('MODERATOR');

    const result = await this.client.kettu.api.guilds(this.guild.id).cases.post({
      data: reqdata,
      headers: { 'x-simulating': mod },
      query: key ? { key } : {},
    });

    return this._add(result);
  }
}

module.exports = KettuGuildCaseManager;
