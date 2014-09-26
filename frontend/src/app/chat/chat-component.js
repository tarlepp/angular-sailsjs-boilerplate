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
     * Chat controller that handles all the view logic.
     */
    angular.module('frontend.example.chat')
        .controller('ChatController',
            [
                '$scope', '$timeout', '$modal',
                'Storage',
                'MessageModel',
                function($scope, $timeout, $modal,
                         Storage,
                         MessageModel
                ) {
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
                    }, true);

                    // Load messages from server
                    MessageModel
                        .load()
                        .then(
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
                            MessageModel
                                .create($scope.message)
                                .then(
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
