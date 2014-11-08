/**
 * Navigation header directive.
 *
 * Purpose of this directive is to render application header navigation. This layout section contains
 * different data depending if user is logged in or not.
 */
(function() {
    'use strict';

    angular.module('frontend.components.directives')
        .directive('navigationHeader', function directive() {
            return {
                restrict: 'E',
                replace: true,
                scope: {},
                templateUrl: '/frontend/components/Directives/Partials/header.html',
                controller: [
                    '$scope',
                    'CurrentUser', 'Auth',
                    function controller(
                        $scope,
                        CurrentUser, Auth
                    ) {
                        $scope.user = CurrentUser.user;
                        $scope.auth = Auth;

                        $scope.logout = function logout() {
                            Auth.logout();
                        };
                    }
                ]
            };
        });
}());
