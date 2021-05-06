'use strict';

const KettuImage = require('../structures/KettuImage');

const IMAGE_CATEGORIES = ['boop', 'hug', 'kiss', 'lick', 'nom', 'nuzzle', 'pat', 'pounce', 'snuggle'];

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
   * @param {boolean} [force=true] Whether to force fetch (implied if category is 'RANDOM')
   * @returns {Promise<KettuImage>}
   */
  async fetch(category, image, force = true) {
    category = category.toLowerCase();
    if (!IMAGE_CATEGORIES.includes(category)) throw new Error('INVALID_CATEGORY');

    const exisiting_image = this.cache.find(cache_img => cache_img.id === image && cache_img.category === category);
    if (!force && image !== 'RANDOM') return exisiting_image;

    const data = await this.client.api.images[category](image).get();

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
   * Get all images from a category
   * @param {string} category The image category
   * @returns {Promise<Array<KettuImage>>}
   */
  async fetchAll(category) {
    category = category.toLowerCase();
    if (!IMAGE_CATEGORIES.includes(category)) throw new Error('INVALID_CATEGORY');

    const data = await this.client.api.images[category].get();

    const images = data.map(d => new KettuImage(this, category, d));
    this.cache.push(...images);
    return images;
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

    const image = await this.client.api.images[category].post(data);

    return new KettuImage(this, category, image);
  }
}

module.exports = KettuImageManager;
