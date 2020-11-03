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

    if (data.notes) {
      /**
       * Notes for this image
       * @type {?string}
       */
      this.notes = data.notes;
    }
  }

  // These methods are stubs, so we can ignore some eslint errors.
  /* eslint-disable no-unused-vars, require-await */

  /**
   * Data representing a Kettu image
   * @typedef {Object} KettuImageData
   * @property {string} direct Direct URL for the image
   * @property {?string} source Source URL for the image
   * @property {?string} notes Notes for the image
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
  async edit(data) {
    if (data.direct) {
      if (typeof data.direct !== 'string') throw new Error('INVALID_DATA_DIRECT');
      this.direct = data.direct;
    }

    if (data.source) {
      if (typeof data.source !== 'string' && data.source !== null) throw new Error('INVALID_DATA_SOURCE');
      this.source = data.source;
    }

    if (data.notes) {
      if (typeof data.notes !== 'string' && data.notes !== null) throw new Error('INVALID_DATA_NOTES');
      this.notes = data.notes;
    }

    return this;
  }
}

module.exports = KettuImage;
