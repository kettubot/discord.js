'use strict';

const KettuUserFlags = require('../util/KettuUserFlags');
const KettuUserSocialBlacklist = require('../util/KettuUserSocialBlacklist');

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

    if (data.flags) {
      /**
       * The kettu flags for this user
       * @type {?KettuUserFlags}
       */
      this.flags = new KettuUserFlags(data.flags);
    }

    /**
     * The kettu permissions for this user
     * @type {integer}
     */
    this.perms = data.perms;

    if (data.votes) {
      /**
       * The number of times this user has voted for Kettu
       * @type {number}
       */
      this.votes = data.votes;
    }

    /**
     * A user's Kettu profile
     * @typedef {Object} KettuUserProfile
     * @property {?string} bio Text bio
     * @property {?ColorResolvable} color Profile color
     */

    /**
     * This user's Kettu profile information
     * @type {KettuUserProfile}
     */
    this.profile = data.profile || {};

    /**
     * A user's Kettu settings
     * @typedef {Object} KettuUserSettings
     * @property {?KettuUserSocialBlacklist} social Social commands to ignore
     * @property {boolean} voteRM Whether this user has enabled vote reminders
     */

    /**
     * This user's Kettu settings
     * @type {KettuUserSettings}
     */
    this.settings = {};
    if (data.settings) {
      this.settings.voteRM = Boolean(data.settings.voteRM);

      if (data.settings.social_blacklist) {
        this.settings.social = new KettuUserSocialBlacklist(data.settings.social_blacklist);
      }
    }
  }

  // These methods are stubs, so we can ignore some eslint errors.
  /* eslint-disable no-unused-vars, require-await */

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
    this.flags = flags;
    return this;
  }

  /**
   * Updates the user's profile information
   * @param {KettuUserProfile} profile The new profile settings, all fields are optional
   * @returns {Promise<KettuUser>}
   */

  async setProfile(profile) {
    this.profile = profile;
    return this;
  }

  /**
   * Updates the user's settings
   * @param {KettuUserSettings} settings The new user settings, all fields are optional
   * @returns {Promise<KettuUser>}
   * @example
   * // Disable a user's bap commands
   * const newflags = user.kettu.settings.social_blacklist.add('BAP')
   * await user.kettu.setSettings({ social: newflags })
   */

  async setSettings(settings) {
    this.settings = settings;
    return this;
  }
}

module.exports = KettuUser;
