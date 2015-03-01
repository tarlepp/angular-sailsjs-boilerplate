/**
 * This file contains all necessary Angular model definitions for 'frontend.examples.book' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function () {
  'use strict';

  /**
   * Model for Book API, this is used to wrap all Book objects specified actions and data change actions.
   */
  angular.module('frontend.examples.book')
    .factory('BookModel', [
      'DataModel',
      function factory(DataModel) {
        return new DataModel('book');
      }
    ])
  ;
}());
