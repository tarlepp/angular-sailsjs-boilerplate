/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.book' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
    'use strict';

    /**
     * Controller to show single book on GUI.
     */
    angular.module('frontend.examples.book')
        .controller('BookController',
            [
                '$scope',
                '_book',
                function($scope,
                         _book
                ) {
                    $scope.book = _book;
                }
            ]
        );

    /**
     * Controller which contains all necessary logic for book list GUI on boilerplate application.
     */
    angular.module('frontend.examples.book')
        .controller('BookListController',
            [
                '$scope', '$q', '$timeout',
                '_',
                'ListConfig',
                'SocketWhereCondition', 'BookModel',
                function(
                    $scope, $q, $timeout,
                    _,
                    ListConfig,
                    SocketWhereCondition, BookModel
                ) {
                    // Initialize data
                    $scope.endPoint = 'book';

                    // Add default list configuration variable to current scope
                    $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

                    // Initialize used title items
                    $scope.titleItems = ListConfig.getTitleItems($scope.endPoint);

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
                     * Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch book data
                     * from server.
                     */
                    $scope.$watch('currentPage', function watcher() {
                        _fetchData();
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
                            where: SocketWhereCondition.get($scope.filters)
                        };

                        // Data query specified parameters
                        var parameters = {
                            populate: 'author',
                            limit: $scope.itemsPerPage,
                            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
                        };

                        // Fetch data count
                        var count = BookModel
                            .count(commonParameters)
                            .then(
                                function callback(response) {
                                    $scope.itemCount = response.count;
                                }
                            );

                        // Fetch actual data
                        var load = BookModel
                            .load(_.merge({}, commonParameters, parameters))
                            .then(
                                function callback(response) {
                                    $scope.items = response;
                                }
                            );

                        // Load all needed data
                        $q
                            .all([count, load])
                            .finally(
                                function callback() {
                                    $scope.loaded = true;
                                    $scope.loading = false;
                                }
                            );
                    }
                }
            ]
        );
}());
