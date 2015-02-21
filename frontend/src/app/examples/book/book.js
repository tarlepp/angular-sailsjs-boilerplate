/**
 * Book component to wrap all book specified stuff together. This component is divided to following logical components:
 *
 *  Controllers
 *  Models
 *
 * All of these are wrapped to 'frontend.examples.book' angular module.
 */
(function() {
  'use strict';

  // Define frontend.examples.book angular module
  angular.module('frontend.examples.book', []);

  // Module configuration
  angular.module('frontend.examples.book')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          // Book list
          .state('examples.books', {
            url: '/examples/books',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/book/list.html',
                controller: 'BookListController',
                resolve: {
                  _items: [
                    'ListConfig',
                    'BookModel',
                    function resolve(
                      ListConfig,
                      BookModel
                    ) {
                      var config = ListConfig.getConfig();

                      var parameters = {
                        limit: config.itemsPerPage,
                        sort: 'releaseDate DESC'
                      };

                      return BookModel.load(parameters);
                    }
                  ],
                  _count: [
                    'BookModel',
                    function resolve(BookModel) {
                      return BookModel.count();
                    }
                  ],
                  _authors: [
                    'AuthorModel',
                    function resolve(AuthorModel) {
                      return AuthorModel.load();
                    }
                  ]
                }
              }
            }
          })

          // Single book
          .state('examples.book', {
            url: '/examples/book/:id',
            views: {
              'content@': {
                templateUrl: '/frontend/examples/book/book.html',
                controller: 'BookController',
                resolve: {
                  _book: [
                    '$stateParams',
                    'BookModel',
                    function resolve(
                      $stateParams,
                      BookModel
                    ) {
                      return BookModel.fetch($stateParams.id, {populate: 'author'});
                    }
                  ]
                }
              }
            }
          })

          // Add new book
          .state('examples.book.add', {
            url: '/examples/book/add',
            data: {
              access: 2
            },
            views: {
              'content@': {
                templateUrl: '/frontend/examples/book/add.html',
                controller: 'BookAddController',
                resolve: {
                  _authors: [
                    'AuthorModel',
                    function resolve(AuthorModel) {
                      return AuthorModel.load();
                    }
                  ]
                }
              }
            }
          })
        ;
      }
    ])
  ;
}());
