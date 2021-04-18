'use strict';

/**
 * Emitted whenever a kettu guild is updated.
 * @event KettuClient#guildUpdate
 * @param {Guild} oldGuild The old data for the guild
 * @param {Guild} newGuild The new data for the guild
 */

module.exports = (kettu, packet) => {
  const guild = kettu.client.guilds.cache.get(packet.d.id);
  if (!guild) return;

  packet.d.config = packet.d.configs[kettu.client.user.id];

  const oldGuild = guild.kettu;
  const newGuild = guild.kettu._patch(packet.d);

  kettu.emit('guildUpdate', oldGuild, newGuild);
};
