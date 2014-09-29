/**
 * This file contains all necessary Angular controller definitions for Book example.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
    'use strict';

    /**
     * Controller to show single book on GUI.
     */
    angular.module('frontend.example.book')
        .controller('BookController',
            [
                '$scope',
                '_book',
                function($scope,
                         _book
                ) {
                    $scope.activeTab = 'example.books';
                    $scope.book = _book;

                    console.log('asdf');
                }
            ]
        );

    /**
     * Controller which contains all necessary logic for book list GUI on
     * boilerplate application.
     */
    angular.module('frontend.example.book')
        .controller('BookListController',
            [
                '$scope', '$q',
                'ModalHelp',
                'ListConfig',
                'BookModel',
                function($scope, $q,
                         ModalHelp,
                         ListConfig,
                         BookModel
                ) {
                    // Initialize modal help service
                    $scope.modalHelp = ModalHelp;
                    $scope.modalHelp.set('Information about "Books" GUI', 'book', 'books');

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

                    // Function to change sort column / direction on list
                    $scope.changeSort = function changeSort(item) {
                        var sort = $scope.sort;

                        if (sort.column === item.column) {
                            sort.direction = !sort.direction;
                        } else {
                            sort.column = item.column;
                            sort.direction = true;
                        }

                        if ($scope.currentPage === 1) {
                            fetchData();
                        } else {
                            $scope.currentPage = 1;
                        }
                    };

                    // Watcher for current page attribute, whenever this changes we need to fetch data from server
                    $scope.$watch('currentPage', function watcherCurrentPage() {
                        fetchData();
                    });

                    /**
                     * Helper function to fetch necessary data for GUI with currently
                     * activated sort / page.
                     */
                    function fetchData() {
                        $scope.loading = true;

                        // Data query specified parameters
                        var parameters = {
                            limit: $scope.itemsPerPage,
                            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
                        };

                        // Fetch data count
                        var count = BookModel
                            .count()
                            .then(
                                function successCallback(response) {
                                    $scope.itemCount = response.count;
                                }
                            );

                        // Fetch actual data
                        var load = BookModel
                            .load(parameters)
                            .then(
                                function successCallback(response) {
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
