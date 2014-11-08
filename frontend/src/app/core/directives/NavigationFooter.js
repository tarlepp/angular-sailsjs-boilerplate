/**
 * Navigation footer directive.
 *
 * Purpose of this directive is to render application footer navigation.
 *
 * @todo Add version info parsing
 */
(function() {
    'use strict';

    angular.module('frontend.core.directives')
        .directive('navigationFooter', function directive() {
            return {
                restrict: 'E',
                replace: true,
                scope: {},
                templateUrl: '/frontend/core/directives/partials/footer.html'
            };
        });
}());
