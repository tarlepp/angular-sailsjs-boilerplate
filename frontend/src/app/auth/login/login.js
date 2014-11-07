/**
 * Messages component which is divided to following logical components:
 *
 *  Controllers
 *
 * All of these are wrapped to 'frontend.login' angular module.
 */
(function() {
    'use strict';

    // Define frontend.auth.login angular module
    angular.module('frontend.auth.login', []);

    // Module configuration
    angular.module('frontend.auth.login')
        .config(
            [
                '$stateProvider',
                function($stateProvider) {
                    $stateProvider
                        // Login
                        .state('auth.login', {
                            data: {
                                access: 0
                            },
                            url: '/login',
                            templateUrl: '/frontend/auth/login/login.html',
                            controller: 'LoginController'
                        })
                    ;
                }
            ]
        );
}());
