(function() {
    'use strict';

    angular.module('frontend')
        .directive('signInDirective', function() {
            return {
                restrict: 'E',
                scope: {},
                controller: [
                    '$scope', '$rootScope', '$modal', 'AUTH_EVENTS',
                    function($scope, $rootScope, $modal, AUTH_EVENTS) {
                        /*
                        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
                            if (!$rootScope.modalOpen) {
                                $rootScope.modalInstance = $modal.open({
                                    templateUrl: '/partials/Directives/SignInDirective/modal.html',
                                    controller: 'SignInController',
                                    backdrop: 'static',
                                    size: 'sm'
                                });
                            }

                            $rootScope.modalOpen = true;
                        });

                        $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
                            $rootScope.modalInstance.close();
                        });
                        */
                    }
                ]
            };
        });
}());
