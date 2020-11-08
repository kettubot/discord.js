'use strict';

const fetch = require('node-fetch');
const KettuImage = require('../structures/KettuImage');

const IMAGE_CATEGORIES = [
  'bap',
  'bellyrub',
  'boop',
  'cookie',
  'hug',
  'kiss',
  'lick',
  'nom',
  'nuzzle',
  'pat',
  'pounce',
  'snuggle',
  'zap',
];

/**
 * Manager for interfacing with Kettu's images
 */
class KettuImageManager {
  constructor(client) {
    /**
     * The kettu client that instantiated this manager
     * @type {KettuClient}
     * @readonly
     */
    this.client = client;

    /**
     * Image cache for this manager
     * <info>Due to the category->id nature of images, this cache is not a collection!</info>
     * @type {Array<KettuImage>}
     */
    this.cache = [];

    IMAGE_CATEGORIES.forEach(category => {
      const category_function = image => this.get(category, image);
      Object.defineProperty(this, category, { value: category_function });
    });
  }

  // These methods are stubs, so we can ignore some eslint errors.
  /* eslint-disable no-unused-vars, require-await */

  /**
   * Data that can be resolved to a Kettu image in a category. This can be:
   * * An image id
   * * 'RANDOM'
   * @typedef {string|number} KettuImageResolvable
   */

  /**
   * Get an image from a category
   * @param {string} category The image category
   * @param {KettuImageResolvable} image Image to retrieve
   * @returns {Promise<KettuImage>}
   */
  async get(category, image) {
    category = category.toLowerCase();
    if (!IMAGE_CATEGORIES.includes(category)) throw new Error('INVALID_CATEGORY');

    // This is still just a stub, but I couldn't think of any other good way to implement it
    // Hopefully this endpoint will be implemented by the time it's needed as a stub

    const data = await fetch(`https://api.kettu.cc/images/${category}/${image}`).then(res => res.json());
    if (data.code) return null;

    const exisiting_image = this.cache.find(cache_img => cache_img.id === data.id && cache_img.category === category);

    if (exisiting_image) {
      exisiting_image._patch(data);
      return exisiting_image;
    } else {
      const new_image = new KettuImage(this, category, data);
      this.cache.push(new_image);
      return new_image;
    }
  }

  /**
   * Create a new Kettu image
   * @param {string} category The image category
   * @param {KettuImageData} data Data for the new image
   * @returns {Promise<KettuImage>}
   */
  async create(category, data) {
    category = category.toLowerCase();
    if (!IMAGE_CATEGORIES.includes(category)) throw new Error('INVALID_CATEGORY');

    if (!data.direct) throw new Error('MISSING_DATA_DIRECT');

    // Stub ID
    data.id = Math.round(Math.random() * 1000);

    return new KettuImage(this, category, data);
  }
}

module.exports = KettuImageManager;
