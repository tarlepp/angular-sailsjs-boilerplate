/**
 * Just an example controller to list all authors.
 *
 * @todo Refactor $http request to use sockets and add service for this.
 */
(function() {
    'use strict';

    angular.module('frontend.controllers')
        .controller('AuthorsController',
            [
                '$scope', '$http', 'Auth', 'CurrentUser',
                function($scope, $http, Auth, CurrentUser) {
                    $scope.auth = Auth;
                    $scope.user = CurrentUser.user;

                    $http
                        .get('http://wunder.sytes.net:1339/author')
                        .then(
                            function(response) {
                                $scope.authors = response.data;
                            }
                        );
                }
            ]
        );
}());
