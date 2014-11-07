/**
 * Login history component. This component is divided to following logical components:
 *
 *  Controllers
 *
 * All of these are wrapped to 'frontend.admin.login-history' angular module.
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
                            templateUrl: '/frontend/admin/loginHistory/index.html',
                            controller: 'LoginHistoryController',
                            resolve: {
                                _historyData: function _historyData() {
                                    return [];
                                }
                            }
                        })
                    ;
                }
            ]
        );
}());
