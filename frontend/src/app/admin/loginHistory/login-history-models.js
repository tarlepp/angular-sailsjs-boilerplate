/**
 * This file contains all necessary Angular model definitions for 'frontend.admin.login-history' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function () {
  'use strict';

  /**
   * Model for Book API, this is used to wrap all Book objects specified actions and data change actions.
   */
  angular.module('frontend.admin.login-history')
    .factory('LoginHistoryModel', [
      '$log',
      'DataModel', 'DataService',
      function factory(
        $log,
        DataModel, DataService
      ) {
        var model = new DataModel('userlogin');

        model.statistics = function statistics(type) {
          var self = this;

          return DataService
            .collection(self.endpoint + '/statistics/', {type: type})
            .then(
              function onSuccess(response) {
                return response.data;
              },
              function onError(error) {
                $log.error('LoginHistoryModel.statistics() failed.', error, self.endpoint, type);
              }
            )
          ;
        };

        return model;
      }
    ])
  ;
}());
