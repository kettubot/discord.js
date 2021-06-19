'use strict';

/**
 * Emitted whenever kAPI is requesting an eval from the client.
 * @event KettuClient#shardEval
 * @param {Object} data The data payload
 */

module.exports = (kettu, packet) => {
  kettu.emit('shardEval', packet);
};
