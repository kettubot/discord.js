'use strict';

const KettuUserAnimalPrefs = require('../util/KettuUserAnimalPrefs');
const KettuUserFlags = require('../util/KettuUserFlags');
const KettuUserPerms = require('../util/KettuUserPerms');
const KettuUserSocialPrefs = require('../util/KettuUserSocialPrefs');

/**
 * Represents a Discord User in Kettu's context.
 */
class KettuUser {
  /**
   * @param {User} user The user this data belongs to
   * @param {Object} data The data for the user
   */
  constructor(user, data) {
    /**
     * The user this structure belongs to
     * @type {User}
     */
    this.user = user;

    /**
     * Whether this user has kettu data loaded
     * @type {boolean}
     */
    this.partial = true;

    if (!data) return;

    this._patch(data);
  }

  _patch(data) {
    this.partial = false;

    /**
     * The kettu flags for this user
     * @type {KettuUserFlags}
     */
    this.flags = new KettuUserFlags(data.flags || 0);

    /**
     * The kettu permissions for this user
     * @type {integer}
     */
    this.perms = new KettuUserPerms(data.perms || 0);

    /**
     * The number of times this user has voted for Kettu
     * @type {number}
     */
    this.votes = data.votes || 0;

    /**
     * A user's Kettu profile
     * @typedef {Object} KettuUserProfile
     * @property {?string} bio Text bio
     * @property {?ColorResolvable} color Profile color
     * @property {number} pronouns The user's preferred pronouns
     * @property {?string} timezone IANA timezone string
     */

    /**
     * This user's Kettu profile information
     * @type {KettuUserProfile}
     */
    this.profile = data.profile;

    /**
     * A user's Kettu settings
     * @typedef {Object} KettuUserSettings
     * @property {boolean} socialDisabled Whether the user has disabled all social commands
     * @property {KettuUserSocialPrefs} socialPrefs Social commands to ignore
     * @property {boolean} animalDisabled Whether the user has disabled all animal commands
     * @property {KettuUserAnimalPrefs} animalPrefs Animal commands to ignore
     * @property {boolean} voteRM Whether this user has enabled vote reminders
     */

    /**
     * This user's Kettu settings
     * @type {KettuUserSettings}
     */
    this.settings = {};

    this.settings.voteRM = Boolean(data.settings.voteRM);

    this.settings.socialDisabled = Boolean(data.settings.socialDisabled);
    this.settings.socialPrefs = new KettuUserSocialPrefs(data.settings.socialPrefs ?? 0);

    this.settings.animalDisabled = Boolean(data.settings.animalDisabled);
    this.settings.animalPrefs = new KettuUserAnimalPrefs(data.settings.animalPrefs ?? 0);
  }

  /**
   * Fetches a user's data
   * @param {boolean} force Whether to still fetch the user if this structure isn't partial
   * @returns {Promise<KettuUser>}
   */
  async fetch(force = false) {
    if (!this.partial && !force) return this;
    const data = await this.user.client.kettu.api.users(this.user.id).get();
    this._patch(data);
    return this;
  }

  /**
   * Updates the user's flags
   * @param {KettuUserFlags} flags New flags
   * @returns {Promise<KettuUser>}
   * @example
   * // Give a user the bughunter flag
   * const newflags = user.kettu.flags.add('BUGHUNTER');
   * await user.kettu.setFlags(newflags);
   */

  async setFlags(flags) {
    if (!(flags instanceof KettuUserFlags)) throw new Error('INVALID_FLAGS');
    const data = await this.user.client.kettu.api.users(this.user.id).patch({ data: { flags: flags.bitfield } });
    this._patch(data);
    return this;
  }

  /**
   * Updates the user's profile information
   * @param {KettuUserProfile} profile The new profile settings, all fields are optional
   * @returns {Promise<KettuUser>}
   */

  async setProfile(profile) {
    const data = await this.user.client.kettu.api.users(this.user.id).patch({ data: { profile: profile } });
    this._patch(data);
    return this;
  }

  /**
   * Updates the user's settings
   * @param {KettuUserSettings} settings The new user settings, all fields are optional
   * @returns {Promise<KettuUser>}
   * @example
   * // Disable a user's bap commands
   * const newflags = user.kettu.settings.socialPrefs.add('BAP')
   * await user.kettu.setSettings({ socialPrefs: newflags })
   */

  async setSettings(settings) {
    if (settings.socialPrefs) settings.socialPrefs = settings.socialPrefs.bitfield;
    if (settings.animalPrefs) settings.animalPrefs = settings.animalPrefs.bitfield;
    const data = await this.user.client.kettu.api.users(this.user.id).patch({ data: { settings: settings } });
    this._patch(data);
    return this;
  }
}

module.exports = KettuUser;
