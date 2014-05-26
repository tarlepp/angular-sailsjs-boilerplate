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
                        .get('http://10.1.1.177:1337/author')
                        .then(
                            function(response) {
                                $scope.authors = response.data;
                            }
                        );
                }
            ]
        );
}());
