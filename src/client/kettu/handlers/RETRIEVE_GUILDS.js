'use strict';

/**
 * Emitted whenever kAPI is requesting guild information from the client.
 * @event KettuClient#retrieveGuilds
 * @param {Object} data The data payload
 */

module.exports = (kettu, packet) => {
  kettu.emit('retrieveGuilds', packet);
};
