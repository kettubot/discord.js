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

    /** */
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
}

module.exports = KettuImage;
