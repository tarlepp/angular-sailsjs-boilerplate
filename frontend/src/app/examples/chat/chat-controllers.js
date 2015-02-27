/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.chat' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  /**
   * Main Chat controller which handles the actions on this Chat example page. This controller is fired up whenever
   * user enters to following url:
   *
   *  http://{YourServer}:{YourPort}/chat
   *
   * where
   *  YourServer  =   Usually 'localhost', this depends on your setup.
   *  YourPort    =   By default 3000 for production and 3001 for development or something else depending on your
   *                  setup.
   *
   * Controller handles message loading and creating of new messages to backend side. Basically really simple stuff.
   *
   * @todo
   *  1) implement 'enter' and 'leave' status messages to chat
   *  2) private messages to another user
   *  3) do not load all messages when user enters to chat
   *  4) add notification about new chat messages, if user is elsewhere on app
   */
  angular.module('frontend.examples.chat')
    .controller('ChatController', [
      '$scope', '$timeout', '$localStorage',
      'moment',
      'MessageService',
      'MessageModel',
      '_messages',
      function controller(
        $scope, $timeout, $localStorage,
        moment,
        MessageService,
        MessageModel,
        _messages
      ) {
        // Add loaded messages to scope
        $scope.messages = _messages;

        // Get current nick of user
        $scope.nick = ($localStorage.chat && $localStorage.chat.nick) ? $localStorage.chat.nick : '';

        // Initialize message object
        $scope.message = {
          nick: $scope.nick,
          message: ''
        };

        // We have nick set, so load messages
        if ($scope.nick && $scope.nick.trim()) {
          _scrollBottom();
        }

        // Watcher for actual messages, whenever this is changed we need to scroll chat to bottom
        $scope.$watch('messages', function watcher(valueNew) {
          if (valueNew) {
            _scrollBottom();
          }
        }, true);

        // Enter to chat function
        $scope.enterToChat = function enterToChat() {
          if ($scope.nick && $scope.nick.trim() !== '') {
            $scope.message.nick = $scope.nick;

            $localStorage.chat = {
              nick: $scope.nick,
              time: moment().format()
            };

            _scrollBottom();
          } else {
            MessageService.error('Please provide some nick.');
          }
        };

        // Function to leave chat
        $scope.leaveChat = function leaveChat() {
          $scope.message.nick = '';
          $scope.nick = '';
          $scope.messages = [];

          $localStorage.chat = {};
        };

        // Function to post a new message to server
        $scope.postMessage = function postMessage() {
          if ($scope.message.message.trim() !== '') {
            MessageModel
              .create($scope.message)
              .then(
                function success() {
                  $scope.message.message = '';

                  _scrollBottom();
                }
              )
            ;
          } else {
            MessageService.error('Please enter some text to chat.');
          }
        };

        /**
         * Helper function to scroll to bottom of the chat
         *
         * @private
         */
        function _scrollBottom() {
          $timeout(function timeout() {
            document.getElementById('messages').scrollTop = $scope.messages.length * 50;
          });
        }
      }
    ])
  ;
}());
