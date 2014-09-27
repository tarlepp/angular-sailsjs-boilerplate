/**
 * Just an example controller to demonstrate message service
 */
(function() {
    'use strict';

    angular.module('frontend.example.messages')
        .controller('MessagesController',
            [
                '$scope', '$http', '$sailsSocket',
                'ModalHelp',
                'Message', 'BackendConfig',
                function($scope, $http, $sailsSocket,
                         ModalHelp,
                         Message, BackendConfig
                ) {
                    // Initialize modal help service
                    $scope.modalHelp = ModalHelp;
                    $scope.modalHelp.set('Information about "Messages" GUI', 'messages');

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
                        Message[$scope.type]($scope.message, $scope.title);
                    };

                    // Function to make invalid HTTP request
                    $scope.makeInvalidHttpRequest = function makeInvalidHttpRequest(type) {
                        $http.get(urls[type]);
                    };

                    // Function to make invalid sockect request
                    $scope.makeInvalidSailsSocketRequest = function makeInvalidSailsSocketRequest(type) {
                        $sailsSocket.get(urls[type]);
                    };
                }
            ]
        );
}());
