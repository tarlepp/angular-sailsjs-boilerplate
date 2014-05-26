/**
 *
 */
(function() {
    'use strict';

    angular.module('frontend.controllers')
        .controller('BooksController',
            [
                '$scope', '$http', 'Auth', 'CurrentUser',
                function($scope, $http, Auth, CurrentUser) {
                    $scope.auth = Auth;
                    $scope.user = CurrentUser.user;

                    $http
                        .get('http://10.1.1.177:1337/book')
                        .then(
                            function(response) {
                                $scope.books = response.data;
                            }
                        );
                }
            ]
        );
}());
