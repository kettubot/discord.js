'use strict';

const KettuImage = require('../../../structures/KettuImage');

/**
 * Emitted whenever a kettu image is deleted.
 * @event KettuClient#imageDelete
 * @param {KettuImage} image The updated kettu image
 */

module.exports = (kettu, packet) => {
  let existing_image = kettu.images.cache.find(ci => ci.id === packet.d.id && ci.category === packet.d.category);

  if (!existing_image) {
    existing_image = new KettuImage(kettu.images, packet.d.category, packet.d);
  } else {
    kettu.images.cache.splice(kettu.images.cache.indexOf(existing_image), 1);
  }

  kettu.emit('imageDelete', existing_image);
};
