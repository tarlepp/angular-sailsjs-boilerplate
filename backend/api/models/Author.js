'use strict';

var _ = require('lodash');

/**
 * Author.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = _.merge(_.cloneDeep(require('../base/Model')), {
  attributes: {
    // Name of the author
    name: {
      type: 'string',
      required: true
    },
    // Author description
    description: {
      type: 'text'
    },

    // Below is all specification for relations to another models

    // Books that area attached to author
    books: {
      collection: 'book',
      via: 'author'
    }
  }
});
