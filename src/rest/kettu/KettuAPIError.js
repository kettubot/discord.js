'use strict';

/**
 * Represents an error from kAPI.
 * @extends Error
 */
class KettuAPIError extends Error {
  constructor(error, status, request) {
    super();
    const flattened = this.constructor.flattenErrors(error.errors || error).join('\n');
    this.name = 'KettuAPIError';
    this.message = error.message && flattened ? `${error.message}\n${flattened}` : error.message || flattened;

    /**
     * The HTTP method used for the request
     * @type {string}
     */
    this.method = request.method;

    /**
     * The path of the request relative to the HTTP endpoint
     * @type {string}
     */
    this.path = request.path;

    /**
     * HTTP error code returned by kAPI
     * @type {number}
     */
    this.code = error.code;

    /**
     * The HTTP status code
     * @type {number}
     */
    this.httpStatus = status;

    /**
     * The data associated with the request that caused this error
     * @type {HTTPErrorData}
     */
    this.requestData = {
      json: request.options.data,
      files: request.options.files ?? [],
    };
  }

  /**
   * Flattens an errors object returned from the API into an array.
   * @param {Object[]} arr kAPI errors array
   * @returns {string[]}
   * @private
   */
  static flattenErrors(arr) {
    return arr?.map(err => `${err.path.join('.')}: ${err.message}`);
  }
}

module.exports = KettuAPIError;
