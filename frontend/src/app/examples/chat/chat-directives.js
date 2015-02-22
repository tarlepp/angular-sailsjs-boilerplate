/**
 * This file contains all necessary Angular directive definitions for 'frontend.examples.chat' module.
 *
 * Note that this file should only contain directives and nothing else.
 */
(function() {
  'use strict';

  /**
   * Directive to resize "chat" screen to take all "possible" space on browser screen. This is just cruel thing to
   * do, but it works like a charm.
   */
  angular.module('frontend.examples.chat')
    .directive('chatScreen', [
      '$timeout', '$window',
      function directive($timeout, $window) {
        return {
          restrict: 'C',
          link: function link(scope, element) {
            var resize = function resize() {
              var totalHeight = angular.element($window).height() - 170;

              angular.element(element).css('height', totalHeight + 'px');
            };

            angular.element($window).bind('resize', function onEvent() {
              resize();
            });

            resize();
          }
        };
      }
    ])
  ;
}());
