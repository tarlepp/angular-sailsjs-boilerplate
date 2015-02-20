/**
 * Angular module for admin component. All of these are wrapped to 'frontend.admin.login-history' angular module. This
 * component is divided to following logical components:
 *
 *  frontend.admin.login-history
 *
 * Also this file contains all necessary information about 'frontend.admin' module route definitions.
 */
(function() {
  'use strict';

  // Define frontend.admin module
  angular.module('frontend.admin', [
    'frontend.admin.login-history'
  ]);

  // Module configuration
  angular.module('frontend.admin')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('admin', {
            parent: 'frontend',
            data: {
              access: 2
            },
            views: {
              'content@': {
                controller: [
                  '$state',
                  function($state) {
                    $state.go('admin.login-history');
                  }
                ]
              },
              'pageNavigation@': {
                templateUrl: '/frontend/core/layout/partials/navigation.html',
                controller: 'NavigationController',
                resolve: {
                  _items: [
                    'ContentNavigationItems',
                    function resolve(ContentNavigationItems) {
                      return ContentNavigationItems.getItems('admin');
                    }
                  ]
                }
              }
            }
          })
        ;
      }
    ])
  ;
}());
