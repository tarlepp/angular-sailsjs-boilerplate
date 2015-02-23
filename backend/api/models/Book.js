'use strict';

var _ = require('lodash');

/**
 * Book.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = _.merge(_.cloneDeep(require('../base/Model')), {
  attributes: {
    // Book title
    title: {
      type: 'string',
      required: true
    },
    // Book description
    description: {
      type: 'text',
      defaultsTo: ''
    },
    // Book release date
    releaseDate: {
      type: 'date',
      required: true
    },

    // Below is all specification for relations to another models

    // Author of the book
    author: {
      model: 'author'
    }
  }
});
