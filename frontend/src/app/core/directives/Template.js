/**
 * Simple directive to use "dynamic" templates within your HTML code. Usage example:
 *
 *  <template src="your_template"></template>
 *
 * Note that this directive assumes that all templates lives inside 'partials' directory.
 */
(function() {
    'use strict';

    angular.module('frontend.core.directives')
        .directive('template', function directive() {
            return {
                restrict: 'E',
                transclude: false,
                scope: true,
                replace: true,
                template: '<div data-ng-include="getTemplateUrl()"></div>',
                link: function link(scope, element, attrs) {
                    scope.getTemplateUrl = function getTemplateUrl() {
                        return '/frontend/partials/' + attrs.src + '.html';
                    };
                }
            };
        });
}());
