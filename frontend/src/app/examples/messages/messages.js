/**
 * Messages component which is divided to following logical components:
 *
 *  Controllers
 *
 * All of these are wrapped to 'frontend.examples.messages' angular module.
 */
(function() {
  'use strict';

  // Define frontend.examples.messages angular module
  angular.module('frontend.examples.messages', []);

  // Module configuration
  angular.module('frontend.examples.messages')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          // Messages
          .state('examples.messages', {
            url: '/examples/messages',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/messages/messages.html',
                controller: 'MessagesController'
              }
            }
          })
        ;
      }
    ])
  ;
}());
