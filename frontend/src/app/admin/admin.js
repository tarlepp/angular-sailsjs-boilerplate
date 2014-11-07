/**
 * Angular module for admin component. This component is divided to following logical components:
 *
 *  frontend.example.admin.login-history
 *
 * All of these are wrapped to 'frontend.admin.login-history' angular module.
 */
(function() {
    'use strict';

    // Define frontend.admin module
    angular.module('frontend.admin', [
        'frontend.admin.login-history'
    ]);

    // Module configuration
    angular.module('frontend.admin')
        .config(
            [
                '$stateProvider',
                function($stateProvider) {
                    $stateProvider
                        .state('admin', {
                            abstract: true,
                            template: '<ui-view/>',
                            data: {
                                access: 2
                            }
                        })
                    ;
                }
            ]
        );
}());
