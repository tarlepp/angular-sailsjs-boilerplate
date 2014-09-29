/**
 * Controller for info modal. This is used to show GUI specified detailed information about
 * how those are done.
 */
(function() {
    'use strict';

    angular.module('frontend.controllers')
        .controller('InfoController',
            [
                '$scope', '$modalInstance',
                '_title', '_section', '_subSection',
                function($scope, $modalInstance,
                         _title, _section, _subSection
                ) {
                    $scope.title = _title;
                    $scope.section = _section;
                    $scope.subSection = _subSection;

                    var file = 'info.html';

                    if ($scope.subSection) {
                        file = $scope.subSection + '-' + file
                    }

                    // Dismiss function for modal
                    $scope.dismiss = function() {
                        $modalInstance.dismiss();
                    };

                    // Getter function for content template
                    $scope.getContentTemplate = function() {
                        return '/frontend/' + $scope.section + '/' + file;
                    };
                }
            ]
        );
}());
