/**
 * Angular module for public.about component. Basically this component contains only the route definition.
 */
(function() {
    'use strict';

    // Define frontend.public module
    angular.module('frontend.public.about', []);

    // Module configuration
    angular.module('frontend.public.about')
        .config(
            [
                '$stateProvider',
                function($stateProvider) {
                    $stateProvider
                        .state('public.about', {
                            url: '/public/about',
                            templateUrl: '/frontend/public/about/about.html'
                        })
                    ;
                }
            ]
        );
}());
