/**
 * Angular module for frontend.examples.about component. Basically this file contains actual angular module initialize
 * and route definitions for this module.
 */
(function() {
  'use strict';

  // Define frontend.public module
  angular.module('frontend.examples.about', []);

  // Module configuration
  angular.module('frontend.examples.about')
    .config([
      '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('examples.about', {
            url: '/about',
            data: {
              access: 0
            },
            views: {
              'content@': {
                templateUrl: '/frontend/examples/about/about.html'
              },
              'pageNavigation@': false
            }
          })
        ;
      }
    ])
  ;
}());
