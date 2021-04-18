'use strict';

/**
 * Emitted whenever a kettu user is updated.
 * @event KettuClient#userUpdate
 * @param {KettuUser} user The new kettu user data
 */

module.exports = (kettu, packet) => {
  const user = kettu.client.users.cache.get(packet.d.id);
  if (!user) return;

  user.kettu._patch(packet.d);

  kettu.emit('guildUpdate', user.kettu);
};
