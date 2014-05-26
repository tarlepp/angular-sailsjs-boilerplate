/**
 * Navigation header directive.
 *
 * Purpose of this directive is to render application header navigation. This layout section contains
 * different data depending if user is logged in or not.
 */
(function() {
    'use strict';

    angular.module('frontend.directives')
        .directive('navigationHeader', function() {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: '/partials/Directives/NavigationHeader/main.html',
                controller: [
                    '$scope', '$state', 'CurrentUser', 'Auth',
                    function($scope, $state, CurrentUser, Auth) {
                        $scope.user = CurrentUser.user;
                        $scope.auth = Auth;

                        $scope.logout = function() {
                            Auth.logout();
                        };
                    }
                ]
            };
        });
}());