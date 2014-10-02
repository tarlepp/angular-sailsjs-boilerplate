/**
 * This file contains all necessary Angular controller definitions for 'frontend.example.chat' module.
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
    angular.module('frontend.example.chat')
        .controller('ChatController',
            [
                '$scope', '$timeout',
                'Storage', 'MessageService',
                'MessageModel',
                function($scope, $timeout,
                         Storage, MessageService,
                         MessageModel
                ) {
                    // Get current nick of user
                    $scope.nick = Storage.get('chat.nick');

                    // Initialize message object
                    $scope.message = {
                        nick: $scope.nick,
                        message: ''
                    };

                    // Helper function to scroll to bottom of the chat
                    function scrollBottom() {
                        $timeout(function() {
                            document.getElementById('messages').scrollTop = $scope.messages.length * 50;
                        });
                    }

                    // Helper function to load messages from database.
                    function loadMessages() {
                        MessageModel
                            .load()
                            .then(
                                function(messages) {
                                    $scope.messages = messages;

                                    scrollBottom();
                                }
                            );
                    }

                    // We have nick set, so load messages
                    if ($scope.nick && $scope.nick.trim()) {
                        loadMessages();
                    }

                    // Watcher for actual messages, whenever this is changed we need to scroll chat to bottom
                    $scope.$watch('messages', function messagesWatcher(valueNew) {
                        if (valueNew) {
                            scrollBottom();
                        }
                    }, true);

                    // Enter to chat function
                    $scope.enterToChat = function enterChat() {
                        if ($scope.nick.trim() !== '') {
                            $scope.message.nick = $scope.nick;

                            Storage.set('chat.nick', $scope.nick);

                            loadMessages();
                        } else {
                            MessageService.error('Please provide some nick.');
                        }
                    };

                    // Function to leave chat
                    $scope.leaveChat = function leaveChat() {
                        $scope.message.nick = '';
                        $scope.nick = '';

                        Storage.unset('chat.nick');
                    };

                    // Function to post a new message to server
                    $scope.postMessage = function() {
                        if ($scope.message.message.trim() !== '') {
                            MessageModel
                                .create($scope.message)
                                .then(
                                    function() {
                                        $scope.message.message = '';

                                        scrollBottom();
                                    }
                                );
                        } else {
                            MessageService.error('Please enter some text to chat.');
                        }
                    };
                }
            ]
        );
}());
