'use strict';
const BitField = require('./BitField');

/**
 * Data structure that makes it easy to interact with a {@link KettuUser#flags} bitfield.
 * @extends {BitField}
 */
class KettuUserFlags extends BitField {}

/**
 * @name KettuUserFlags
 * @kind constructor
 * @memberof KettuUserFlags
 * @param {BitFieldResolvable} [bits=0] Bit(s) to read from
 */

/**
 * Numeric user flags. All available properties:
 * * `OWNER`
 * * `KETTU_STAFF`
 * * `LEAD_DEVELOPER`
 * * `DEVELOPER`
 * * `DONOR_SUPER`
 * * `DONOR`
 * * `BOOSTER`
 * * `CONTRIBUTOR`
 * * `BUGHUNTER`
 * * `ARTHUNTER`
 * * `VOTER`
 * @type {Object}
 */
KettuUserFlags.FLAGS = {
  OWNER: 1 << 0,
  KETTU_STAFF: 1 << 1,
  LEAD_DEVELOPER: 1 << 2,
  DEVELOPER: 1 << 3,
  DONOR_SUPER: 1 << 4,
  DONOR: 1 << 5,
  BOOSTER: 1 << 6,
  CONTRIBUTOR: 1 << 7,
  BUGHUNTER: 1 << 8,
  ARTHUNTER: 1 << 9,
  VOTER: 1 << 10,
};

module.exports = KettuUserFlags;
