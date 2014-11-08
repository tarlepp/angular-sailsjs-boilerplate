/**
 * Angular module for examples component. This component is divided to following logical components:
 *
 *  frontend.examples.author
 *  frontend.examples.book
 *  frontend.examples.chat
 *  frontend.examples.messages
 *
 * Each component has it own configuration for ui-router.
 */
(function() {
    'use strict';

    // Define frontend.admin module
    angular.module('frontend.examples', [
        'frontend.examples.about',
        'frontend.examples.author',
        'frontend.examples.book',
        'frontend.examples.chat',
        'frontend.examples.messages'
    ]);

    // Module configuration
    angular.module('frontend.examples')
        .config(
            [
                '$stateProvider',
                function($stateProvider) {
                    $stateProvider
                        .state('examples', {
                            abstract: true,
                            template: '<ui-view/>',
                            data: {
                                access: 1
                            }
                        })
                    ;
                }
            ]
        );
}());
