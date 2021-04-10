'use strict';
const BitField = require('./BitField');

/**
 * Data structure that makes it easy to interact with a {@link KettuUser#flags} bitfield.
 * @extends {BitField}
 */
class KettuUserAnimalPrefs extends BitField {}

/**
 * @name KettuUserAnimalPrefs
 * @kind constructor
 * @memberof KettuUserAnimalPrefs
 * @param {BitFieldResolvable} [bits=0] Bit(s) to read from
 */

/**
 * Numeric animal commands to ignore. All available animal commands:
 * * `BIRD`
 * * `CAT`
 * * `DOG`
 * * `DUCK`
 * * `FOX`
 * * `KOALA`
 * * `OTTER`
 * * `OWL`
 * * `PANDA`
 * * `RABBIT`
 * * `REDPANDA`
 * * `SNAKE`
 * * `TURTLE`
 * * `WOLF`
 * @type {Object}
 */
KettuUserAnimalPrefs.FLAGS = {
  BIRD: 1 << 0,
  CAT: 1 << 1,
  DOG: 1 << 2,
  DUCK: 1 << 3,
  FOX: 1 << 4,
  KOALA: 1 << 5,
  OTTER: 1 << 6,
  OWL: 1 << 7,
  PANDA: 1 << 8,
  RABBIT: 1 << 9,
  REDPANDA: 1 << 10,
  SNAKE: 1 << 11,
  TURTLE: 1 << 12,
  WOLF: 1 << 13,
};

module.exports = KettuUserAnimalPrefs;
