/**
 * Just an example controller to demonstrate message service
 */
(function() {
    'use strict';

    angular.module('frontend.example.messages')
        .controller('MessagesController',
            [
                '$scope', '$http', '$sailsSocket', 'Message',
                function($scope, $http, $sailsSocket, Message) {
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
                        'http://wunder.sytes.net:1339/Basdfasdf',
                        'http://wunder.sytes.net:1339/Book/123123123'
                    ];

                    $scope.makeInvalidHttpRequest = function(type) {
                        $http.get(urls[type]);
                    };

                    $scope.makeInvalidSailsSocketRequest = function(type) {
                        $sailsSocket.get(urls[type]);
                    };
                }
            ]
        );
}());
