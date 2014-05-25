'use strict';

/**
 * Book.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
    schema: true,

    attributes: {
        title: {
            type:       'string',
            required:   true
        },
        description: {
            type:       'text',
            defaultsTo: ''
        },
        releaseDate: {
            type:       'date',
            required:   true
        },
        author: {
            model: 'author'
        },
        chapters: {
            collection: 'chapter',
            via: 'book'
        }
    }
};

