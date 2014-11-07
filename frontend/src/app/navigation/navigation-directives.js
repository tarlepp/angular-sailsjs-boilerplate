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
                    'template': '@'
                },
                templateUrl: '/frontend/navigation/navigation.html',
                controller: [
                    '$scope', '$state',
                    '_',
                    'CurrentUser',
                    'NavigationInfoModalService', 'NavigationItemService',
                    function controller(
                        $scope, $state,
                        _,
                        CurrentUser,
                        NavigationInfoModalService, NavigationItemService
                    ) {
                        $scope.modalService = NavigationInfoModalService;
                        $scope.modalService.set($scope.title, $scope.directory, $scope.template);
                        $scope.navigationItems = NavigationItemService;

                        /**
                         * Helper function to check if menu item is active or not. This is used to activate menu item
                         * that has dropdown menu defined.
                         *
                         * @param   {layout.menuItem}   item
                         *
                         * @returns {boolean}
                         */
                        $scope.isActive = function isActive(item) {
                            if (!item.items) {
                                return false;
                            }

                            var found = _.find(item.items, function iterator(/** layout.menuItem */ item) {
                                return $state.current.name === item.state;
                            });

                            return !!found;
                        };

                        /**
                         * Helper function to check if given menu item is valid for current user or not.
                         *
                         * @param   {layout.menuItem}   item
                         *
                         * @returns {boolean}
                         */
                        $scope.isValid = function isValid(item) {
                            var output = true;

                            if (item.admin && CurrentUser.user().admin !== true) {
                                output = false;
                            }

                            return output;
                        };
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
