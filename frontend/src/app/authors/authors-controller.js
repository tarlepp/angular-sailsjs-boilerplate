/**
 * Just an example controller to list all authors.
 */
(function() {
    'use strict';

    angular.module('frontend.example.authors')
        .controller('AuthorsController',
            [
                '$scope', '$q',
                'ModalHelp',
                'ListConfig',
                'AuthorModel',
                function($scope, $q,
                         ModalHelp,
                         ListConfig,
                         AuthorModel
                ) {
                    // Initialize modal help service
                    $scope.modalHelp = ModalHelp;
                    $scope.modalHelp.set('Information about "Authors" GUI', 'authors');

                    // Initialize data
                    $scope.endPoint = 'author';

                    // Add default list configuration variable to current scope
                    $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

                    // Initialize used title items
                    $scope.titleItems = ListConfig.getTitleItems($scope.endPoint);

                    // Initialize default sort data
                    $scope.sort = {
                        column: 'name',
                        direction: true
                    };

                    // Function to change sort column / direction on list
                    $scope.changeSort = function(item) {
                        var sort = $scope.sort;

                        if (sort.column === item.column) {
                            sort.direction = !sort.direction;
                        } else {
                            sort.column = item.column;
                            sort.direction = true;
                        }

                        if ($scope.currentPage === 1) {
                            $scope.fetchData();
                        } else {
                            $scope.currentPage = 1;
                        }
                    };

                    // Scope function to fetch data count and actual data
                    $scope.fetchData = function() {
                        $scope.loading = true;

                        // Data query specified parameters
                        var parameters = {
                            limit: $scope.itemsPerPage,
                            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
                            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
                        };

                        // Fetch data count
                        var count = AuthorModel
                            .count()
                            .then(
                                function countSuccess(response) {
                                    $scope.itemCount = response.count;
                                }
                            );

                        // Fetch actual data
                        var load = AuthorModel
                            .load(parameters)
                            .then(
                                function loadSuccess(response) {
                                    $scope.items = response;
                                }
                            );

                        // And wrap those all to promise loading
                        $q
                            .all([count, load])
                            .finally(function allIsDone() {
                                $scope.loaded = true;
                                $scope.loading = false;
                            });
                    };

                    // Watcher for current page attribute, whenever this changes we need to fetch data from server
                    $scope.$watch('currentPage', function() {
                        $scope.fetchData();
                    });
                }
            ]
        );
}());
