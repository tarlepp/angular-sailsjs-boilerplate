/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.book' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller for new book creation.
  angular.module('frontend.examples.book')
    .controller('BookAddController', [
      '$scope', '$state',
      'MessageService',
      'BookModel',
      '_authors',
      function controller(
        $scope, $state,
        MessageService,
        BookModel,
        _authors
      ) {
        // Store authors
        $scope.authors = _authors;

        // Initialize book model
        $scope.book = {
          title: '',
          description: '',
          author: '',
          releaseDate: new Date()
        };

        /**
         * Scope function to store new book to database. After successfully save user will be redirected
         * to view that new created book.
         */
        $scope.addBook = function addBook() {
          BookModel
            .create(angular.copy($scope.book))
            .then(
              function onSuccess(result) {
                MessageService.success('New book added successfully');

                $state.go('examples.book', {id: result.data.id});
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single book on GUI.
  angular.module('frontend.examples.book')
    .controller('BookController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'BookModel', 'AuthorModel',
      '_book',
      function controller(
        $scope, $state,
        UserService, MessageService,
        BookModel, AuthorModel,
        _book
      ) {
        // Set current scope reference to model
        BookModel.setScope($scope, 'book');

        // Initialize scope data
        $scope.user = UserService.user();
        $scope.book = _book;
        $scope.authors = [];
        $scope.selectAuthor = _book.author ? _book.author.id : null;

        // Book delete dialog buttons configuration
        $scope.confirmButtonsDelete = {
          ok: {
            label: 'Delete',
            className: 'btn-danger',
            callback: function callback() {
              $scope.deleteBook();
            }
          },
          cancel: {
            label: 'Cancel',
            className: 'btn-default pull-left'
          }
        };

        /**
         * Scope function to save the modified book. This will send a
         * socket request to the backend server with the modified object.
         */
        $scope.saveBook = function saveBook() {
          var data = angular.copy($scope.book);

          // Set author id to update data
          data.author = $scope.selectAuthor;

          // Make actual data update
          BookModel
            .update(data.id, data)
            .then(
              function onSuccess() {
                MessageService.success('Book "' + $scope.book.title + '" updated successfully');
              }
            )
          ;
        };

        /**
         * Scope function to delete current book. This will send DELETE query to backend via web socket
         * query and after successfully delete redirect user back to book list.
         */
        $scope.deleteBook = function deleteBook() {
          BookModel
            .delete($scope.book.id)
            .then(
              function onSuccess() {
                MessageService.success('Book "' + $scope.book.title + '" deleted successfully');

                $state.go('examples.books');
              }
            )
          ;
        };

        /**
         * Scope function to fetch author data when needed, this is triggered whenever user starts to edit
         * current book.
         *
         * @returns {null|promise}
         */
        $scope.loadAuthors = function loadAuthors() {
          if ($scope.authors.length) {
            return null;
          } else {
            return AuthorModel
              .load()
              .then(
                function onSuccess(data) {
                  $scope.authors = data;
                }
              )
            ;
          }
        };
      }
    ])
  ;

  // Controller which contains all necessary logic for book list GUI on boilerplate application.
  angular.module('frontend.examples.book')
    .controller('BookListController', [
      '$scope', '$q', '$timeout',
      '_',
      'ListConfig', 'SocketHelperService',
      'UserService', 'BookModel', 'AuthorModel',
      '_items', '_count', '_authors',
      function controller(
        $scope, $q, $timeout,
        _,
        ListConfig, SocketHelperService,
        UserService, BookModel, AuthorModel,
        _items, _count, _authors
      ) {
        // Set current scope reference to models
        BookModel.setScope($scope, false, 'items', 'itemCount');
        AuthorModel.setScope($scope, false, 'authors');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;
        $scope.authors = _authors;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(BookModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'releaseDate',
          direction: false
        };

        // Initialize filters
        $scope.filters = {
          searchWord: '',
          columns: $scope.titleItems
        };

        // Function to change sort column / direction on list
        $scope.changeSort = function changeSort(item) {
          var sort = $scope.sort;

          if (sort.column === item.column) {
            sort.direction = !sort.direction;
          } else {
            sort.column = item.column;
            sort.direction = true;
          }

          _triggerFetchData();
        };

        /**
         * Helper function to fetch specified author property.
         *
         * @param   {Number}    authorId        Author id to search
         * @param   {String}    [property]      Property to return, if not given returns whole author object
         * @param   {String}    [defaultValue]  Default value if author or property is not founded
         *
         * @returns {*}
         */
        $scope.getAuthor = function getAuthor(authorId, property, defaultValue) {
          defaultValue = defaultValue || 'Unknown';
          property = property || true;

          // Find author
          var author = _.find($scope.authors, function iterator(author) {
            return parseInt(author.id, 10) === parseInt(authorId.toString(), 10);
          });

          return author ? (property === true ? author : author[property]) : defaultValue;
        };

        /**
         * Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch book data
         * from server.
         */
        $scope.$watch('currentPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _fetchData();
          }
        });

        /**
         * Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch book data
         * from server.
         */
        $scope.$watch('itemsPerPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _triggerFetchData();
          }
        });

        var searchWordTimer;

        /**
         * Watcher for 'filter' scope variable, which contains multiple values that we're interested
         * within actual GUI. This will trigger new data fetch query to server if following conditions
         * have been met:
         *
         *  1) Actual filter variable is different than old one
         *  2) Search word have not been changed in 400ms
         *
         * If those are ok, then watcher will call 'fetchData' function.
         */
        $scope.$watch('filters', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            if (searchWordTimer) {
              $timeout.cancel(searchWordTimer);
            }

            searchWordTimer = $timeout(_triggerFetchData, 400);
          }
        }, true);

        /**
         * Helper function to trigger actual data fetch from backend. This will just check current page
         * scope variable and if it is 1 call 'fetchData' function right away. Any other case just set
         * 'currentPage' scope variable to 1, which will trigger watcher to fetch data.
         *
         * @private
         */
        function _triggerFetchData() {
          if ($scope.currentPage === 1) {
            _fetchData();
          } else {
            $scope.currentPage = 1;
          }
        }

        /**
         * Helper function to fetch actual data for GUI from backend server with current parameters:
         *  1) Current page
         *  2) Search word
         *  3) Sort order
         *  4) Items per page
         *
         * Actually this function is doing two request to backend:
         *  1) Data count by given filter parameters
         *  2) Actual data fetch for current page with filter parameters
         *
         * These are fetched via 'BookModel' service with promises.
         *
         * @private
         */
        function _fetchData() {
          $scope.loading = true;

          // Common parameters for count and data query
          var commonParameters = {
            where: SocketHelperService.getWhere($scope.filters)
          };

          // Data query specified parameters
          var parameters = {
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = BookModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Fetch actual data
          var load = BookModel
            .load(_.merge({}, commonParameters, parameters))
            .then(
              function onSuccess(response) {
                $scope.items = response;
              }
            )
          ;

          // Load all needed data
          $q
            .all([count, load])
            .finally(
              function onFinally() {
                $scope.loaded = true;
                $scope.loading = false;
              }
            )
          ;
        }
      }
    ])
  ;
}());
