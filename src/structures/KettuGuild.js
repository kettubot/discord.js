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

    this._patch({
      config: {
        prefix: '/',
      },
    });

    if (!data) return;

    this._patch(data);
  }

  _patch(data) {
    /**
     * Kettu Config for the guild
     * @type {KettuGuildConfig}
     */
    this.config = new KettuGuildConfig(this.guild, data.config);
  }
}

module.exports = KettuGuild;
