/**
 * This file contains all necessary Angular controller definitions for 'frontend.examples.navigation' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
    'use strict';

    /**
     * Controller for navigation info modal. This is used to show GUI specified detailed information about how those
     * are done (links to sources + generic information / description).
     */
    angular.module('frontend.example.navigation')
        .controller('NavigationModalController',
            [
                '$scope', '$modalInstance',
                'BackendConfig',
                '_title', '_directory', '_template',
                function(
                    $scope, $modalInstance,
                    BackendConfig,
                    _title, _directory, _template
                ) {
                    $scope.title = _title;
                    $scope.directory = _directory;
                    $scope.template = _template;
                    $scope.backendConfig = BackendConfig;

                    // Dismiss function for modal
                    $scope.dismiss = function dismiss() {
                        $modalInstance.dismiss();
                    };

                    // Getter function for content template
                    $scope.getContentTemplate = function getContentTemplate() {
                        return '/frontend/' + $scope.directory + '/' + $scope.template + '-info.html';
                    };
                }
            ]
        );
}());
