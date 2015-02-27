/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.author' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  // Controller for new author creation.
  angular.module('frontend.examples.author')
    .controller('AuthorAddController', [
      '$scope', '$state',
      'MessageService', 'AuthorModel',
      function controller(
        $scope, $state,
        MessageService, AuthorModel
      ) {
        // Initialize author model
        $scope.author = {
          name: '',
          description: ''
        };

        /**
         * Scope function to store new author to database. After successfully save user will be redirected
         * to view that new created author.
         */
        $scope.addAuthor = function addAuthor() {
          AuthorModel
            .create(angular.copy($scope.author))
            .then(
              function onSuccess(result) {
                MessageService.success('New author added successfully');

                $state.go('examples.author', {id: result.data.id});
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller to show single author on GUI.
  angular.module('frontend.examples.author')
    .controller('AuthorController', [
      '$scope', '$state',
      'UserService', 'MessageService',
      'AuthorModel', 'BookModel',
      '_author', '_books', '_booksCount',
      function controller(
        $scope, $state,
        UserService, MessageService,
        AuthorModel, BookModel,
        _author, _books, _booksCount
      ) {
        // Set current scope reference to models
        AuthorModel.setScope($scope, 'author');
        BookModel.setScope($scope, false, 'books', 'booksCount');

        // Expose necessary data
        $scope.user = UserService.user();
        $scope.author = _author;
        $scope.books = _books;
        $scope.booksCount = _booksCount.count;

        // Author delete dialog buttons configuration
        $scope.confirmButtonsDelete = {
          ok: {
            label: 'Delete',
            className: 'btn-danger',
            callback: function callback() {
              $scope.deleteAuthor();
            }
          },
          cancel: {
            label: 'Cancel',
            className: 'btn-default pull-left'
          }
        };

        // Scope function to save modified author.
        $scope.saveAuthor = function saveAuthor() {
          var data = angular.copy($scope.author);

          // Make actual data update
          AuthorModel
            .update(data.id, data)
            .then(
              function onSuccess() {
                MessageService.success('Author "' + $scope.author.name + '" updated successfully');
              }
            )
          ;
        };

        // Scope function to delete author
        $scope.deleteAuthor = function deleteAuthor() {
          AuthorModel
            .delete($scope.author.id)
            .then(
              function onSuccess() {
                MessageService.success('Author "' + $scope.author.name + '" deleted successfully');

                $state.go('examples.authors');
              }
            )
          ;
        };
      }
    ])
  ;

  // Controller which contains all necessary logic for author list GUI on boilerplate application.
  angular.module('frontend.examples.author')
    .controller('AuthorListController', [
      '$scope', '$q', '$timeout',
      '_',
      'ListConfig',
      'SocketHelperService', 'UserService', 'AuthorModel',
      '_items', '_count',
      function controller(
        $scope, $q, $timeout,
        _,
        ListConfig,
        SocketHelperService, UserService, AuthorModel,
        _items, _count
      ) {
        // Set current scope reference to model
        AuthorModel.setScope($scope, false, 'items', 'itemCount');

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;
        $scope.user = UserService.user();

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(AuthorModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'name',
          direction: true
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
         * Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch author data
         * from server.
         */
        $scope.$watch('currentPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _fetchData();
          }
        });

        /**
         * Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch author data
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
         * These are fetched via 'AuthorModel' service with promises.
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
            populate: 'books',
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = AuthorModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Fetch actual data
          var load = AuthorModel
            .load(_.merge({}, commonParameters, parameters))
            .then(
              function onSuccess(response) {
                $scope.items = response;
              }
            )
          ;

          // And wrap those all to promise loading
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
