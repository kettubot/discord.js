'use strict';

const routeBuilder = require('./APIRouter');
const KettuAPIRequest = require('./KettuAPIRequest');
const DiscordAPIError = require('../DiscordAPIError');
const HTTPError = require('../HTTPError');

function parseResponse(res) {
  if (res.headers.get('content-type').startsWith('application/json')) return res.json();
  return res.buffer();
}

class KettuRESTManager {
  constructor(client, tokenPrefix = 'Bot') {
    this.client = client;
    this.tokenPrefix = tokenPrefix;
    this.versioned = true;
  }

  get api() {
    return routeBuilder(this);
  }

  getAuth() {
    const token = this.client.token;
    if (token) return `${this.tokenPrefix} ${token}`;
    throw new Error('TOKEN_MISSING');
  }

  async request(method, url, options = {}) {
    const request = new KettuAPIRequest(this, method, url, options);

    // Perform the request
    let res;
    try {
      res = await request.make();
    } catch (error) {
      // Retry the specified number of times for request abortions
      throw new HTTPError(error.message, error.constructor.name, error.status, request.method, request.path);
    }

    // Handle 2xx and 3xx responses
    if (res.ok) {
      // Nothing wrong with the request, proceed with the next one
      return parseResponse(res);
    }

    // Handle 4xx responses
    if (res.status >= 400 && res.status < 500) {
      // Handle possible malformed requests
      let data;
      try {
        data = await parseResponse(res);
      } catch (err) {
        throw new HTTPError(err.message, err.constructor.name, err.status, request.method, request.path);
      }

      throw new DiscordAPIError(request.path, data, request.method, res.status);
    }

    // Handle 5xx responses
    if (res.status >= 500 && res.status < 600) {
      // Retry the specified number of times for possible serverside issues
      throw new HTTPError(res.statusText, res.constructor.name, res.status, request.method, request.path);
    }

    // Fallback in the rare case a status code outside the range 200..=599 is returned
    return null;
  }

  get endpoint() {
    return this.client.options.api;
  }

  set endpoint(endpoint) {
    this.client.options.api = endpoint;
  }
}

module.exports = KettuRESTManager;
