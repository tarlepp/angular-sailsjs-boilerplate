/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.messages' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  /**
   * Message controller that demonstrates boilerplate error handling and usage of MessageService.
   *
   * @todo
   *  1) Make example about $http / $sailsSocket usage where automatic message is disabled.
   *  2) Make example about invalid JWT
   */
  angular.module('frontend.examples.messages')
    .controller('MessagesController', [
      '$scope', '$http', '$sailsSocket',
      'MessageService', 'BackendConfig',
      function(
        $scope, $http, $sailsSocket,
        MessageService, BackendConfig
      ) {
        // Initialize used scope variables
        $scope.title = '';
        $scope.message = '';
        $scope.type = 'info';
        $scope.messageTypes = [
          'info', 'success', 'warning', 'error'
        ];

        // Specify invalid urls
        var urls = [
          BackendConfig.url + '/Basdfasdf',
          BackendConfig.url + '/Book/123123123'
        ];

        // Scope function to show specified message
        $scope.showMessage = function showMessage() {
          MessageService[$scope.type]($scope.message, $scope.title);
        };

        // Function to make invalid HTTP request
        $scope.makeInvalidHttpRequest = function makeInvalidHttpRequest(type) {
          $http.get(urls[type]);
        };

        // Function to make invalid socket request
        $scope.makeInvalidSailsSocketRequest = function makeInvalidSailsSocketRequest(type) {
          $sailsSocket.get(urls[type]);
        };
      }
    ])
  ;
}());
