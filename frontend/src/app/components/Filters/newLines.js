/**
 * Simple filter to replace '\n' strings with '<br />'. Usage example:
 *
 *  <p data-ng-bind-html="book.description | newlines"></p>
 *
 * Note that you have bind string as HTML to get this work.
 */
(function() {
    'use strict';

    angular.module('frontend.components.filters')
        .filter('newLines', function filter() {
            return function newLines(text) {
                return text.toString().replace(/\n/g, '<br/>');
            };
        });
}());
