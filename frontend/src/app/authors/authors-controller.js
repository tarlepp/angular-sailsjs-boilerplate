/**
 * Just an example controller to list all authors.
 */
(function() {
    'use strict';

    angular.module('frontend.example.authors')
        .controller('AuthorsController',
            [
                '$scope', '$q', '$modal',
                'DataService',
                function($scope, $q, $modal,
                         DataService
                ) {
                    // Initialize data
                    $scope.endPoint = 'author';
                    $scope.itemCount = 0;
                    $scope.items = [];
                    $scope.itemsPerPage = 10;
                    $scope.currentPage = 1;
                    $scope.loading = true;
                    $scope.loaded = false;

                    // Initialize used title items
                    $scope.titleItems = [
                        {title: 'Author', column: 'name'},
                        {title: 'Books', column: false, class: 'text-right'}
                    ];

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
                        var count = DataService
                            .count($scope.endPoint)
                            .then(function(response) {
                                $scope.itemCount = response.data.count;
                            });

                        // Fetch actual data
                        var collection = DataService
                            .collection($scope.endPoint, parameters)
                            .then(function(response) {
                                $scope.items = response.data;
                            });

                        $q
                            .all([count, collection])
                            .finally(function() {
                                $scope.loaded = true;
                                $scope.loading = false;
                            });
                    };

                    $scope.$watch('currentPage', function() {
                        $scope.fetchData();
                    });

                    // Help function for this controller
                    $scope.showHelp = function() {
                        $modal.open({
                            templateUrl: '/frontend/info/help.html',
                            controller: 'InfoController',
                            size: 'lg',
                            resolve: {
                                title: function() {
                                    return 'Information about "Authors" GUI';
                                },
                                section: function() {
                                    return 'authors';
                                }
                            }
                        });
                    };
                }
            ]
        );
}());
