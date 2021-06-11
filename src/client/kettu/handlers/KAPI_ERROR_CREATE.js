'use strict';

/**
 * Emitted whenever kAPI encounters an error.
 * @event KettuClient#kAPIErrorCreate
 * @param {Object} error The error payload
 */

module.exports = (kettu, packet) => {
  kettu.emit('kAPIErrorCreate', packet);
};
