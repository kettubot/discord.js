'use strict';

/**
 * Emitted whenever a kettu guild is updated.
 * @event KettuClient#guildUpdate
 * @param {KettuGuild} guild The new kettu guild data
 */

module.exports = (kettu, packet) => {
  const guild = kettu.client.guilds.cache.get(packet.d.id);
  if (!guild) return;

  packet.d.config = packet.d.configs[kettu.client.user.id];
  guild.kettu._patch(packet.d);

  kettu.emit('guildUpdate', guild.kettu);
};
