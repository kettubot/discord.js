'use strict';

const KettuImage = require('../../../structures/KettuImage');

/**
 * Emitted whenever a kettu image is updated.
 * @event KettuClient#imageUpdate
 * @param {KettuImage} image The updated kettu image
 */

module.exports = (kettu, packet) => {
  let existing_image = kettu.images.cache.find(ci => ci.id === packet.d.id && ci.category === packet.d.category);

  if (!existing_image) {
    existing_image = new KettuImage(kettu.images, packet.d.category, packet.d);
    kettu.images.cache.push(existing_image);
  } else {
    existing_image._patch(packet.d);
  }

  kettu.emit('imageUpdate', existing_image);
};
