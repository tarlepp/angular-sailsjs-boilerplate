/**
 * Angular module for auth component. This component is divided to following logical components:
 *
 *  frontend.auth.login
 *
 * Each component has it own configuration for ui-router.
 */
(function() {
  'use strict';

  // Define frontend.auth module
  angular.module('frontend.core.auth', [
    'frontend.core.auth.login',
    'frontend.core.auth.services'
  ]);

  // Module configuration
  angular.module('frontend.core.auth')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('auth', {
            abstract: true,
            parent: 'frontend',
            data: {
              access: 1
            }
          })
        ;
      }
    ])
  ;
}());
