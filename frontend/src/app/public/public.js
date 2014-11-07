/**
 * Angular module for public component. This component is divided to following logical components:
 *
 *  frontend.public.about
 *
 * Each component has it own configuration for ui-router.
 */
(function() {
    'use strict';

    // Define frontend.public module
    angular.module('frontend.public', [
        'frontend.public.about'
    ]);

    // Module configuration
    angular.module('frontend.public')
        .config(
            [
                '$stateProvider',
                function($stateProvider) {
                    $stateProvider
                        .state('public', {
                            abstract: true,
                            template: '<ui-view/>',
                            data: {
                                access: 0
                            }
                        })
                    ;
                }
            ]
        );
}());
