/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.login-history' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  angular.module('frontend.admin.login-history')
    .controller('LoginHistoryController', [
      '$scope',
      'ListConfig',
      'LoginHistoryModel',
      '_items', '_count',
      function controller(
        $scope,
        ListConfig,
        LoginHistoryModel,
        _items, _count
      ) {
        // Set current scope reference to models
        LoginHistoryModel.setScope($scope, false, 'items', 'itemCount');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(LoginHistoryModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'releaseDate',
          direction: false
        };

        // Initialize filters
        $scope.filters = {
          searchWord: '',
          columns: $scope.titleItems
        };
      }
    ])
  ;
}());
