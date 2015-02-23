'use strict';

/**
 * UserLogin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
  schema: true,

  attributes: {
    // User IP-address
    ip: {
      type: 'string',
      required: true
    },
    // User hostname
    host: {
      type: 'string',
      required: true
    },
    // User browser user-agent
    agent: {
      type: 'text',
      required: true
    },
    // User browser
    browser: {
      type: 'string',
      defaultsTo: 'Unknown'
    },
    // User browser version
    browserVersion: {
      type: 'string',
      defaultsTo: 'Unknown'
    },
    // User browser family
    browserFamily: {
      type: 'string',
      defaultsTo: 'Unknown'
    },
    // User operation system
    os: {
      type: 'string',
      defaultsTo: 'Unknown'
    },
    // User operation system version
    osVersion: {
      type: 'string',
      defaultsTo: 'Unknown'
    },
    // User operation system family
    osFamily: {
      type: 'string',
      defaultsTo: 'Unknown'
    },
    // This is needed for login summary data, dummy but no other choice atm...
    count: {
      type: 'integer',
      defaultsTo: 1
    },

    // Below is all specification for relations to another models

    // Attached User object of this UserLogin
    user: {
      model: 'User',
      columnName: 'userId',
      required: true
    }
  }
};
