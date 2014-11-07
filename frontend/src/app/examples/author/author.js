/**
 * Author component to wrap all author specified stuff together. This component is divided to following logical
 * components:
 *
 *  Controllers
 *  Models
 *
 * All of these are wrapped to 'frontend.examples.author' angular module.
 */
(function() {
    'use strict';

    // Define frontend.examples.author angular module
    angular.module('frontend.examples.author', []);

    // Module configuration
    angular.module('frontend.examples.author')
        .config(
            [
                '$stateProvider',
                function($stateProvider) {
                    $stateProvider
                        // Authors list
                        .state('examples.authors', {
                            url: '/examples/authors',
                            templateUrl: '/frontend/examples/author/list.html',
                            controller: 'AuthorListController'
                        })

                        // Single author
                        .state('examples.author', {
                            url: '/examples/author/:id',
                            templateUrl: '/frontend/examples/author/author.html',
                            controller: 'AuthorController',
                            resolve: {
                                _author: [
                                    '$stateParams',
                                    'AuthorModel',
                                    function resolve(
                                        $stateParams,
                                        AuthorModel
                                    ) {
                                        return AuthorModel
                                            .fetch($stateParams.id, {populate: 'books'});
                                    }
                                ]
                            }
                        })
                    ;
                }
            ]
        );
}());
