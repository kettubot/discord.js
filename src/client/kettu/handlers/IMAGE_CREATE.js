'use strict';

const KettuImage = require('../../../structures/KettuImage');

/**
 * Emitted whenever a kettu image is created.
 * @event KettuClient#imageCreate
 * @param {KettuImage} image The new kettu image
 */

module.exports = (kettu, packet) => {
  const image = new KettuImage(kettu.images, packet.d.category, packet.d);
  kettu.images.cache.push(image);
  kettu.emit('imageCreate', image);
};
