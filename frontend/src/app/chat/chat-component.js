/**
 * Chat component to demonstrate power of sails.js websockets. This Angular component contains
 * following individual components for chat demonstration:
 *
 *  chatScreen directive
 *  Messages service
 *  ChatController
 *
 * With these components we can make live chat to application.
 */
(function() {
    'use strict';

    /**
     * Directive to resize "chat" screen to take all possible
     */
    angular.module('frontend.example.chat')
        .directive('chatScreen',
            [
                '$timeout',
                function($timeout) {
                    return {
                        restrict: 'C',
                        link: function(scope, element) {
                            var resize = function() {
                                var totalHeight =  angular.element(document).height() - 170;

                                angular.element(element).css('height', totalHeight + 'px');
                            };

                            angular.element(window).resize(function() {
                                $timeout(resize);
                            });

                            resize();
                        }
                    };
                }
            ]
        );

    /**
     * Message factory for chat messages. This will handle subscribe to message collection, add
     * of new messages and updating actual collection of messages that are shown in GUI.
     */
    angular.module('frontend.example.chat')
        .factory('Messages',
            [
                '$sailsSocket', '$timeout', 'BackendConfig',
                function($sailsSocket, $timeout, BackendConfig) {
                    var messages = [];
                    var handlers = {};

                    // Add handler for 'created' event
                    handlers.created = function(message) {
                        messages.push(message.data);

                        $timeout(function() {
                            document.getElementById('messages').scrollTop = messages.length * 50;
                        });
                    };

                    // Subscribe to messages and attach 'created' event to 'message' room
                    $sailsSocket
                        .subscribe('message', function(message) {
                            handlers[message.verb](message);
                        });

                    // Load messages from server
                    function loadMessages() {
                        return $sailsSocket
                            .get(BackendConfig.url + '/message')
                            .success(
                                function(response) {
                                    messages = response;

                                    return response;
                                }
                            );
                    }

                    // Create a new message
                    function sendMessage(message) {
                        return $sailsSocket
                            .post(BackendConfig.url + '/message', message)
                            .success(
                                function(response) {
                                    messages.push(response);

                                    return response;
                                }
                            );
                    }

                    return {
                        load: loadMessages,
                        send: sendMessage
                    };
                }
            ]
        );

    /**
     * Chat controller that handles all the view logic.
     */
    angular.module('frontend.example.chat')
        .controller('ChatController',
            [
                '$scope', '$timeout', '$modal', 'Messages', 'Storage',
                function($scope, $timeout, $modal, Messages, Storage) {
                    $scope.nick = Storage.get('chat.nick');
                    $scope.message = {
                        nick: $scope.nick,
                        message: ''
                    };

                    function scrollBottom() {
                        $timeout(function() {
                            document.getElementById('messages').scrollTop = $scope.messages.length * 50;
                        });
                    }

                    // Watcher for message controller
                    $scope.$watch('messages', function(valueNew) {
                        if (valueNew) {
                            scrollBottom();
                        }
                    });

                    // Load messages from server
                    Messages
                        .load()
                        .success(
                            function(messages) {
                                $scope.messages = messages;

                                scrollBottom();
                            }
                        );

                    $scope.enterToChat = function() {
                        if ($scope.nick !== '') {
                            $scope.message.nick = $scope.nick;

                            Storage.set('chat.nick', $scope.nick);

                            scrollBottom();
                        }
                    };

                    // Function to post a new message
                    $scope.postMessage = function() {
                        if ($scope.message.message !== '') {
                            Messages
                                .send($scope.message)
                                .success(
                                    function() {
                                        $scope.message.message = '';

                                        scrollBottom();
                                    }
                                );
                        }
                    };

                    // Help function for this controller
                    $scope.showHelp = function() {
                        $modal.open({
                            templateUrl: '/frontend/info/help.html',
                            controller: 'InfoController',
                            size: 'lg',
                            resolve: {
                                title: function() {
                                    return 'Information about "Chat" GUI';
                                },
                                section: function() {
                                    return 'chat';
                                }
                            }
                        });
                    };
                }
            ]
        );
}());
