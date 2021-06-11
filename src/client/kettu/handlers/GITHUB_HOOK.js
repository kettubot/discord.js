'use strict';

/**
 * Emitted whenever a github hook is triggered.
 * @event KettuClient#githubHook
 * @param {Object} data The hook payload
 */

module.exports = (kettu, packet) => {
  kettu.emit('githubHook', packet);
};
