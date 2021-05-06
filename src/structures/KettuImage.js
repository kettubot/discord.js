'use strict';

/**
 * Represents an image from kAPI
 */
class KettuImage {
  constructor(manager, category, data) {
    /**
     * The manager for this image
     * @type {KettuImageManager}
     */
    this.manager = manager;

    /**
     * The category for this image
     * @type {string}
     */
    this.category = category;

    if (!data) return;

    this._patch(data);
  }

  _patch(data) {
    /**
     * ID of the image, numerical, starting from zero
     * @type {number}
     */
    this.id = data.id;

    /**
     * Direct URL of this image
     * @type {string}
     */
    this.direct = data.direct;

    if (data.source) {
      /**
       * The source URL of this image
       * @type {?string}
       */
      this.source = data.source;
    }

    if (data.artist) {
      /**
       * The artist's image page
       * @type {?string}
       */
      this.artist = data.artist;
    }

    if (data.notes) {
      /**
       * Notes for this image
       * @type {?string}
       */
      this.notes = data.notes;
    }

    if (data.tags) {
      /**
       * Tags for this image
       * @type {Array<string>}
       */
      this.tags = data.tags;
    }

    if (data.feedback) {
      /**
       * Data representing feedback on an image
       * @typedef {KettuImageFeedback}
       * @property {Array<Snowflake>} likes Likes on the image
       * @property {Array<Snowflake>} dislikes Dislikes on the image
       * @property {Array<KettuImageFlagData>} flags Flags on the image
       */

      /**
       * Feedback for this image
       * @type {KettuImageFeedback}
       */
      this.feedback = data.feedback || {};

      if (!this.feedback.likes) this.feedback.likes = [];
      if (!this.feedback.dislikes) this.feedback.dislikes = [];
      if (!this.feedback.flags) this.feedback.flags = [];
    }
  }

  /**
   * Data representing a Kettu image
   * @typedef {Object} KettuImageData
   * @property {string} direct Direct URL for the image
   * @property {?string} source Source URL for the image
   * @property {?string} artist Artist home page
   * @property {?string} notes Notes for the image
   * @property {?Array<string>} tags Tags for the image
   */

  /**
   * Edits the image.
   * @param {KettuImageData} data The new data for the image
   * @returns {Promise<KettuImage>}
   * @example
   * // Edit an image
   * image.edit({ source: 'new source' })
   *   .then(updated => console.log(`Edited role source to ${updated.source}`))
   *   .catch(console.error);
   */
  edit(data) {
    return this.manager.client.api.images[this.category](this.id).patch(data);
  }

  /**
   * Data representing an image flag
   * @typedef {Object} KettuImageFlagData
   * @property {Snowflake} user User adding the flag
   * @property {string} reason Reason for the flag
   */

  /**
   * Response from adding image feedback
   * @typedef {Object} KettuImageFeedbackResponse
   * @property {Object} likes Information for added likes
   * @property {Array<Snowflake>} likes.added The likes that were added
   * @property {Array<Snowflake>} likes.skipped The likes that were skipped (user already had a like)
   * @property {Array<Snowflake>} dislikes.added The dislikes that were added
   * @property {Array<Snowflake>} dislikes.skipped The dislikes that were skipped (user already had a dislike)
   * @property {Array<KettuImageFlagData>} flags.added The flags that were added
   * @property {Array<KettuImageFlagData>} flags.skipped The flags that were skipped (user already had a flag)
   */

  /**
   * Adds feedback for the image.
   * @param {Array<Snowflake>} likes Users to add likes for
   * @param {Array<Snowflake>} dislikes Users to add dislikes for
   * @param {Array<KettuImageFlagData>} flags Flags to add
   * @returns {Promise<KettuImageFeedbackResponse>}
   * @example
   * // Add a dislike and a flag for the message author
   * const result = await image.addFeedback([], [msg.author.id], [{ user: msg.author.id, reason: 'its bad' }])
   * console.log(`Dislikes: added ${result.dislikes.added}, skipped ${result.dislikes.skipped}`)
   * console.log(`Flags: added ${result.flags.added}, skipped ${result.flags.skipped}`)
   */
  addFeedback(likes = [], dislikes = [], flags = []) {
    return this.manager.client.api.images[this.category](this.id).feedback.patch({ data: { likes, dislikes, flags } });
  }

  /**
   * Removes feedback for the image.
   * @param {Array<Snowflake>} likes Users to remove likes for
   * @param {Array<Snowflake>} dislikes Users to remove dislikes for
   * @param {Array<Snowflake>} flags Users to remove flags for
   * @returns {Promise<KettuImage>}
   * @example
   * // Removes all likes, dislikes and flags for the message author
   * await image.removeFeedback([msg.author.id], [msg.author.id], [msg.author.id])
   */
  removeFeedback(likes = [], dislikes = [], flags = []) {
    return this.manager.client.api.images[this.category](this.id).feedback.delete({ data: { likes, dislikes, flags } });
  }
}

module.exports = KettuImage;
