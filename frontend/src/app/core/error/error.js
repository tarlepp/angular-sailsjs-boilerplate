// Generic models angular module initialize.
(function() {
  'use strict';

  angular.module('frontend.core.error', []);

  // Module configuration
  angular.module('frontend.core.error')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('error', {
            parent: 'frontend',
            url: '/error',
            data: {
              access: 0
            },
            views: {
              'content@': {
                templateUrl: '/frontend/core/error/partials/error.html',
                controller: 'ErrorController',
                resolve: {
                  _error: function resolve() {
                    return this.self.error;
                  }
                }
              }
            }
          })
        ;
      }
    ])
  ;
}());
