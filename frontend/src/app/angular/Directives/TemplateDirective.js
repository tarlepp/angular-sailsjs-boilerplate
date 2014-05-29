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
                    return '/partials/' + attrs.src + '.html';
                };
            },
            template: '<div data-ng-include=\'getTemplateUrl()\'></div>'
        };
    });