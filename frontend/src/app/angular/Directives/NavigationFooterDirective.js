/**
 * Navigation footer directive.
 *
 * Purpose of this directive is to render application footer navigation.
 *
 * @todo Add version info parsing
 */
(function() {
    'use strict';

    angular.module('frontend.directives')
        .directive('navigationFooter', function() {
            return {
                restrict: 'E',
                replace: true,
                scope: {},
                templateUrl: '/partials/Directives/NavigationFooter/footer.html'
            };
        });
}());
