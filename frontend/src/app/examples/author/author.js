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
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          // Authors list
          .state('examples.authors', {
            url: '/examples/authors',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/author/list.html',
                controller: 'AuthorListController',
                resolve: {
                  _items: [
                    'ListConfig',
                    'AuthorModel',
                    function resolve(
                      ListConfig,
                      AuthorModel
                    ) {
                      var config = ListConfig.getConfig();

                      var parameters = {
                        populate: 'books',
                        limit: config.itemsPerPage,
                        sort: 'name ASC'
                      };

                      return AuthorModel.load(parameters);
                    }
                  ],
                  _count: [
                    'AuthorModel',
                    function resolve(AuthorModel) {
                      return AuthorModel.count();
                    }
                  ]
                }
              }
            }
          })

          // Single author
          .state('examples.author', {
            url: '/examples/author/:id',
            views: {
              'content@': {
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
                      return AuthorModel.fetch($stateParams.id);
                    }
                  ],
                  _books: [
                    '$stateParams',
                    'BookModel',
                    function resolve(
                      $stateParams,
                      BookModel
                    ) {
                      return BookModel.load({author: $stateParams.id});
                    }
                  ],
                  _booksCount: [
                    '$stateParams',
                    'BookModel',
                    function resolve(
                      $stateParams,
                      BookModel
                    ) {
                      return BookModel.count({author: $stateParams.id});
                    }
                  ]
                }
              }
            }
          })

          // Add new author
          .state('examples.author.add', {
            url: '/examples/author/add',
            data: {
              access: 2
            },
            views: {
              'content@': {
                templateUrl: '/frontend/examples/author/add.html',
                controller: 'AuthorAddController'
              }
            }
          })
        ;
      }
    ])
  ;
}());
