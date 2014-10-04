/**
 * This file contains all necessary Angular directive definitions for 'frontend.example.navigation' module.
 *
 * Note that this file should only contain directives and nothing else.
 */
(function() {
    'use strict';

    angular.module('frontend.example.navigation')
        .directive('pageNavigation', function() {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    'title': '@',
                    'directory': '@',
                    'template': '@',
                    'activeTab': '@'
                },
                templateUrl: '/frontend/navigation/navigation.html',
                controller: [
                    '$scope',
                    'NavigationInfoModalService',
                    function($scope,
                             NavigationInfoModalService
                    ) {
                        $scope.modalService = NavigationInfoModalService;

                        $scope.modalService.set($scope.title, $scope.directory, $scope.template);

                        $scope.navigationItems = [
                            {
                                url: 'example.books',
                                title: 'Books'
                            },
                            {
                                url: 'example.authors',
                                title: 'Authors'
                            },
                            {
                                url: 'example.messages',
                                title: 'Messages'
                            },
                            {
                                url: 'example.chat',
                                title: 'Chat'
                            }
                        ];
                    }
                ]
            };
        });
}());
