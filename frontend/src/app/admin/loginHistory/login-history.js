/**
 * Login history component. This component is divided to following logical components:
 *
 *  Controllers
 *
 * All of these are wrapped to 'frontend.admin.login-history' angular module. This also contains necessary route
 * definitions for this module.
 */
(function() {
    'use strict';

    // Define frontend.admin module.login-history
    angular.module('frontend.admin.login-history', []);

    // Module configuration
    angular.module('frontend.admin.login-history')
        .config(
            [
                '$stateProvider',
                function($stateProvider) {
                    $stateProvider
                        .state('admin.login-history', {
                            url: '/admin/loginHistory',
                            views: {
                                'content@': {
                                    templateUrl: '/frontend/admin/loginHistory/index.html',
                                    controller: 'LoginHistoryController',
                                    resolve: {
                                        _historyData: function resolve() {
                                            return [];
                                        }
                                    }
                                }
                            }
                        })
                    ;
                }
            ]
        );
}());
