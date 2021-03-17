'use strict';
const BitField = require('./BitField');

/**
 * Data structure that makes it easy to calculate intents.
 * @extends {BitField}
 */
class KettuIntents extends BitField {}

/**
 * @name KettuIntents
 * @kind constructor
 * @memberof KettuIntents
 * @param {KettuIntentsResolvable} [bits=0] Bit(s) to read from
 */

/**
 * Data that can be resolved to give a permission number. This can be:
 * * A string (see {@link KettuIntents.FLAGS})
 * * An intents flag
 * * An instance of KettuIntents
 * * An array of KettuIntentsResolvable
 * @typedef {string|number|KettuIntents|KettuIntentsResolvable[]} KettuIntentsResolvable
 */

/**
 * Numeric websocket intents. All available properties:
 * * `SHARDS`
 * * `USERS`
 * * `GUILDS`
 * * `GUILD_CASES`
 * * `GUILD_MEMBERS`
 * * `IMAGES`
 * * `INTERNAL`
 * @type {Object}
 */
KettuIntents.FLAGS = {
  SHARDS: 1 << 0,
  USERS: 1 << 1,
  GUILDS: 1 << 2,
  GUILD_CASES: 1 << 3,
  GUILD_MEMBERS: 1 << 4,
  IMAGES: 1 << 5,
  INTERNAL: 1 << 6,
};

/**
 * Bitfield representing all intents combined
 * @type {number}
 */
KettuIntents.ALL = Object.values(KettuIntents.FLAGS).reduce((acc, p) => acc | p, 0);

module.exports = KettuIntents;
