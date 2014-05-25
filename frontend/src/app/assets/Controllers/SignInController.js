(function() {
    'use strict';

    angular.module('frontend')
        .controller('SignInController',
            [
                '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService',
                function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
                    $scope.credentials = {
                        username: '',
                        password: '',
                        rememberMe: false
                    };

                    $scope.signIn = function() {
                        AuthService
                            .login($scope.credentials)
                            .then(
                                function() {
                                    console.log('success');
                                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                                },
                                function() {
                                    console.log('failed');
                                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                                }
                            );
                    };
                }
            ]
        );
}());
