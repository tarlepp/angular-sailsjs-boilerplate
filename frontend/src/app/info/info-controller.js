/**
 * Controller for info modal. This is used to show GUI specified detailed information about
 * how those are done.
 */
(function() {
    'use strict';

    angular.module('frontend.controllers')
        .controller('InfoController',
            [
                '$scope', '$modalInstance', 'title', 'section',
                function($scope, $modalInstance, title, section) {
                    $scope.title = title;
                    $scope.section = section;

                    // Dismiss function for modal
                    $scope.dismiss = function() {
                        $modalInstance.dismiss();
                    };

                    // Getter function for content template
                    $scope.getContentTemplate = function() {
                        return '/frontend/' + $scope.section + '/info.html';
                    };
                }
            ]
        );
}());