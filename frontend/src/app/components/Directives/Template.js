/**
 * Simple directive to use "dynamic" templates within your HTML code. Usage example:
 *
 *  <template src="your_template"></template>
 *
 * Note that this directive assumes that all templates lives inside 'partials' directory.
 */
(function() {
    'use strict';

    angular.module('frontend.directives')
        .directive('template', function() {
            return {
                restrict: 'E',
                transclude: false,
                scope: true,
                replace: true,
                link: function(scope, element, attrs) {
                    scope.getTemplateUrl = function() {
                        return '/frontend/partials/' + attrs.src + '.html';
                    };
                },
                template: '<div data-ng-include="getTemplateUrl()"></div>'
            };
        });
}());
