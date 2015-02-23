'use strict';

/**
 * RequestLog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
  schema: true,

  attributes: {
    // Request method
    method: {
      type: 'string',
      required: true
    },
    // Request URL
    url: {
      type: 'string',
      required: true
    },
    // Request headers
    headers: {
      type: 'json'
    },
    // Used parameters
    parameters: {
      type: 'json'
    },
    // Request query
    query: {
      type: 'json'
    },
    // Request body
    body: {
      type: 'json'
    },
    // Request protocol
    protocol: {
      type: 'string'
    },
    // Request IP address
    ip: {
      type: 'string'
    },
    // Request response time
    responseTime: {
      type: 'integer'
    },
    // Middleware latency
    middlewareLatency: {
      type: 'integer'
    },

    // Below is all specification for relations to another models

    // User object
    user: {
      model: 'User',
      columnName: 'userId',
      required: true
    }
  }
};
