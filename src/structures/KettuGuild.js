'use strict';

const KettuGuildConfig = require('./KettuGuildConfig');

/**
 * Interfaces with the kAPI for a specific guild.
 */
class KettuGuild {
  /**
   * @param {Guild} guild The guild this data belongs to
   * @param {Object} data The data for the guild
   */
  constructor(guild, data) {
    /**
     * The guild this manager belongs to
     * @type {Guild}
     */
    this.guild = guild;

    /**
     * Whether this guild has kettu data loaded
     * @type {boolean}
     */
    this.partial = true;

    /**
     * Kettu Config for the guild
     * @type {KettuGuildConfig}
     */
    this.config = new KettuGuildConfig(this.guild, {});

    if (!data) return;

    this._patch(data);
  }

  _patch(data) {
    this.partial = false;

    if (data.config) this.config._patch(data.config);

    /**
     * Whether the guild is premium or not
     * @type {boolean}
     */
    this.premium = Boolean(data.premium);
  }

  /**
   * Fetches a guild's data
   * @param {boolean} force Whether to still fetch the user if this structure isn't partial
   * @returns {Promise<KettuGuild>}
   */
  async fetch(force = false) {
    if (!this.partial && !force) return this;
    const data = await this.guild.client.kettu.api.guilds(this.guild.id).get();
    this._patch(data);
    return this;
  }
}

module.exports = KettuGuild;
