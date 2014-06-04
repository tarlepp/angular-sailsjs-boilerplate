/**
 * Just an example controller to show information about one book.
 */
(function() {
    'use strict';

    angular.module('frontend.example.book')
        .controller('BookController',
            [
                '$scope', 'book',
                function($scope, book) {
                    $scope.activeTab = 'example.books';
                    $scope.book = book;
                }
            ]
        );
}());
