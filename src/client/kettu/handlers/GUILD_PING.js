'use strict';

module.exports = (client, packet) => {
  const guild = client.client.guilds.cache.get(packet.d.guild_id);
  client.emit('guildPing', guild);
};
