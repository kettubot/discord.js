'use strict';

const { KettuWSEvents } = require('../../../util/Constants');

const handlers = {};

for (const name of Object.keys(KettuWSEvents)) {
  try {
    handlers[name] = require(`./${name}.js`);
  } catch {} // eslint-disable-line no-empty
}

module.exports = handlers;
