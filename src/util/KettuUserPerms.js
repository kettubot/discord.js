'use strict';
const BitField = require('./BitField');

/**
 * Data structure that makes it easy to interact with a {@link KettuUser#perms} bitfield.
 * @extends {BitField}
 */
class KettuUserPerms extends BitField {}

/**
 * @name KettuUserPerms
 * @kind constructor
 * @memberof KettuUserPerms
 * @param {BitFieldResolvable} [bits=0] Bit(s) to read from
 */

/**
 * Numeric user flags. All available properties:
 * * `OWNER`
 * * `ADMIN`
 * * `MANAGE_USERS`
 * * `MANAGE_IMAGES`
 * * `MANAGE_GUILDS_GLOBAL`
 * * `READ_GUILDS_GLOBAL`
 * * `MANAGE_GUILDS`
 * * `READ_GUILDS`
 * * `READ_USERS`
 * * `READ_IMAGES`
 * @type {Object}
 */
KettuUserPerms.FLAGS = {
  OWNER: 1 << 0,
  ADMIN: 1 << 1,
  KETTU: 1 << 2,
  MANAGE_USERS: 1 << 3,
  MANAGE_IMAGES: 1 << 4,
  MANAGE_GUILDS_GLOBAL: 1 << 5,
  READ_GUILDS_GLOBAL: 1 << 6,
  MANAGE_GUILDS: 1 << 7,
  READ_GUILDS: 1 << 8,
  READ_USERS: 1 << 9,
  READ_IMAGES: 1 << 10,
};

module.exports = KettuUserPerms;
