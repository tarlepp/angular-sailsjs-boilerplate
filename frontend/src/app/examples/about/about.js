/**
 * Angular module for examples.about component. Basically this component contains only the route definition.
 */
(function() {
    'use strict';

    // Define frontend.public module
    angular.module('frontend.examples.about', []);

    // Module configuration
    angular.module('frontend.examples.about')
        .config(
            [
                '$stateProvider',
                function($stateProvider) {
                    $stateProvider
                        .state('examples.about', {
                            url: '/about',
                            templateUrl: '/frontend/examples/about/about.html',
                            data: {
                                access: 0
                            }
                        })
                    ;
                }
            ]
        );

}());
