/**
 * Angular module for auth component. This component is divided to following logical components:
 *
 *  frontend.auth.login
 *
 * Each component has it own configuration for ui-router.
 */
(function() {
    'use strict';

    // Define frontend.auth module
    angular.module('frontend.auth', [
        'frontend.auth.login'
    ]);

    // Module configuration
    angular.module('frontend.auth')
        .config(
        [
            '$stateProvider',
            function($stateProvider) {
                $stateProvider
                    .state('auth', {
                        abstract: true,
                        parent: 'frontend',
                        data: {
                            access: 1
                        }
                    })
                ;
            }
        ]
    );
}());
