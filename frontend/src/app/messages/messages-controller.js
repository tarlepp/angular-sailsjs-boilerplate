/**
 * Just an example controller to demonstrate message service
 */
(function() {
    'use strict';

    angular.module('frontend.example.messages')
        .controller('MessagesController',
            [
                '$scope', '$http', '$sailsSocket', '$modal', 'Message', 'BackendConfig',
                function($scope, $http, $sailsSocket, $modal, Message, BackendConfig) {
                    $scope.message = '';
                    $scope.type = 'default';
                    $scope.messageTypes = [
                        'default', 'success', 'error', 'warning'
                    ];

                    // Scope function to show specified message
                    $scope.showMessage = function() {
                        Message.message($scope.message, {type: $scope.type});
                    };

                    var urls = [
                        BackendConfig.url + '/Basdfasdf',
                        BackendConfig.url + '/Book/123123123'
                    ];

                    $scope.makeInvalidHttpRequest = function(type) {
                        $http.get(urls[type]);
                    };

                    $scope.makeInvalidSailsSocketRequest = function(type) {
                        $sailsSocket.get(urls[type]);
                    };

                    // Help function for this controller
                    $scope.showHelp = function() {
                        $modal.open({
                            templateUrl: '/partials/layout/help.html',
                            controller: 'InfoController',
                            size: 'lg',
                            resolve: {
                                title: function() {
                                    return 'Information about "Messages" GUI';
                                },
                                section: function() {
                                    return 'messages';
                                }
                            }
                        });
                    };
                }
            ]
        );
}());
