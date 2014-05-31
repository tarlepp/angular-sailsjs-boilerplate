'use strict';

/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
    schema: true,

    attributes: {
        nick: {
            type: 'text',
            required: true
        },
        message: {
            type: 'text',
            required: true
        },
        user: {
            model: 'user'
        }
    }
};

