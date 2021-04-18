'use strict';

/**
 * Emitted whenever a kettu guild is pinged.
 * @event KettuClient#guildPing
 * @param {Guild} guild The guild that was pinged
 */

module.exports = (kettu, packet) => {
  const guild = kettu.client.guilds.cache.get(packet.d.guild_id);
  kettu.emit('guildPing', guild);
};
