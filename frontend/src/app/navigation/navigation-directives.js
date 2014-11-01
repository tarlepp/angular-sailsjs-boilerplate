/**
 * This file contains all necessary Angular directive definitions for 'frontend.example.navigation' module.
 *
 * Note that this file should only contain directives and nothing else.
 */
(function() {
    'use strict';

    /**
     * Common page navigation directive, which is used on every example page on this boilerplate application. Usage
     * example:
     *
     *  <page-navigation
     *      data-title='Information about "Books" GUI'
     *      data-directory='book'
     *      data-template='list'
     *  ></page-navigation>
     *
     * This will render navigation items to page.
     */
    angular.module('frontend.example.navigation')
        .directive('pageNavigation', function pageNavigation() {
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
                    function controller(
                        $scope,
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

    /**
     * Directive to show used files on specified example page.
     */
    angular.module('frontend.example.navigation')
        .directive('pageInfoFiles', function pageInfoFiles() {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    'directory': '@',
                    'template': '@'
                },
                templateUrl: '/frontend/navigation/files.html',
                controller: [
                    '$scope',
                    'NavigationInfoModalFiles',
                    function controller(
                        $scope,
                        NavigationInfoModalFiles
                    ) {
                        $scope.files = NavigationInfoModalFiles.get($scope.directory, $scope.template);

                        $scope.getTooltip = function getTooltip(item) {
                            return '<h5 class="title">' + item.title + '</h5>' + item.info;
                        };
                    }
                ]
            };
        });
}());
