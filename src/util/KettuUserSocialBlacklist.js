'use strict';
const BitField = require('./BitField');

/**
 * Data structure that makes it easy to interact with a {@link KettuUser#flags} bitfield.
 * @extends {BitField}
 */
class KettuUserSocialBlacklist extends BitField {}

/**
 * @name KettuUserSocialBlacklist
 * @kind constructor
 * @memberof KettuUserSocialBlacklist
 * @param {BitFieldResolvable} [bits=0] Bit(s) to read from
 */

/**
 * Numeric social commands to ignore. All available social commands:
 * * `BAP`
 * * `BELLYRUB`
 * * `BOOP`
 * * `COOKIE`
 * * `HUG`
 * * `KISS`
 * * `LICK`
 * * `NOM`
 * * `NUZZLE`
 * * `PAT`
 * * `POUNCE`
 * * `SNUGGLE`
 * * `ZAP`
 * @type {Object}
 */
KettuUserSocialBlacklist.FLAGS = {
  BAP: 1 << 0,
  BELLYRUB: 1 << 1,
  BOOP: 1 << 2,
  COOKIE: 1 << 3,
  HUG: 1 << 4,
  KISS: 1 << 5,
  LICK: 1 << 6,
  NOM: 1 << 7,
  NUZZLE: 1 << 8,
  PAT: 1 << 9,
  POUNCE: 1 << 10,
  SNUGGLE: 1 << 11,
  ZAP: 1 << 12,
};

module.exports = KettuUserSocialBlacklist;
