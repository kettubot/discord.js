'use strict';

const https = require('https');
const FormData = require('@discordjs/form-data');
const AbortController = require('abort-controller');
const fetch = require('node-fetch');
const { KettuUserAgent } = require('../../util/Constants');

if (https.Agent) var agent = new https.Agent({ keepAlive: true });

class KettuAPIRequest {
  constructor(rest, method, path, options) {
    this.rest = rest;
    this.client = rest.client;
    this.method = method;
    this.options = options;

    let queryString = '';
    if (options.query) {
      const query = Object.entries(options.query)
        .filter(([, value]) => value !== null && typeof value !== 'undefined')
        .flatMap(([key, value]) => (Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]));
      queryString = new URLSearchParams(query).toString();
    }
    this.path = `${path}${queryString && `?${queryString}`}`;
  }

  make() {
    const API =
      this.options.versioned === false
        ? this.client.options.api
        : `${this.client.options.api}/v${this.client.options.version}`;
    const url = API + this.path;
    let headers = {};

    if (this.options.auth !== false) headers.Authorization = this.rest.getAuth();
    if (this.options.reason) headers['X-Audit-Log-Reason'] = encodeURIComponent(this.options.reason);
    headers['User-Agent'] = KettuUserAgent;
    if (this.options.headers) headers = Object.assign(headers, this.options.headers);

    let body;
    if (this.options.files && this.options.files.length) {
      body = new FormData();
      for (const file of this.options.files) if (file && file.file) body.append(file.name, file.file, file.name);
      if (typeof this.options.data !== 'undefined') body.append('payload_json', JSON.stringify(this.options.data));
      headers = Object.assign(headers, body.getHeaders());
      // eslint-disable-next-line eqeqeq
    } else if (this.options.data != null) {
      body = JSON.stringify(this.options.data);
      headers['Content-Type'] = 'application/json';
    }

    const controller = new AbortController();
    const timeout = this.client.client.setTimeout(
      () => controller.abort(),
      this.client.client.options.restRequestTimeout,
    );
    return fetch(url, {
      method: this.method,
      headers,
      agent,
      body,
      signal: controller.signal,
    }).finally(() => this.client.client.clearTimeout(timeout));
  }
}

module.exports = KettuAPIRequest;
