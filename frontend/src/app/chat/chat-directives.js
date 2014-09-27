/**
 * This file contains all chat specified directives that are used on chat example
 *
 * Note that this file should only contain directives and nothing else.
 */
(function() {
    'use strict';

    /**
     * Directive to resize "chat" screen to take all "possible" space on browser screen.
     * This is just crude thing to do, but it works.
     */
    angular.module('frontend.example.chat')
        .directive('chatScreen',
            [
                '$timeout',
                function($timeout) {
                    return {
                        restrict: 'C',
                        link: function(scope, element) {
                            var resize = function() {
                                var totalHeight = angular.element(document).height() - 170;

                                angular.element(element).css('height', totalHeight + 'px');
                            };

                            angular.element(window).resize(function() {
                                $timeout(resize);
                            });

                            resize();
                        }
                    };
                }
            ]
        );
}());
