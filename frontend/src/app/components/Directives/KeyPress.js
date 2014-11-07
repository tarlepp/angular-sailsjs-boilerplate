/**
 * Directive to bind some scope method to certain element and key code. Example this directive can be used to submit
 * form data from input fields by pressing [enter].
 *
 * Usage example:
 *
 *  <input id="message" name="message" class="form-control" type="text"
 *      data-key-press="postMessage()"
 *      data-key-code="13"
 *      data-timeout="400"
 *      data-ng-model="message.message"
 *  />
 *
 * Example above triggers 'postMessage' scope function when user presses [enter] key after 400ms waiting. Also note
 * that data-timeout attribute is not required. If it has
 */
(function() {
    'use strict';

    angular.module('frontend.directives')
        .directive('keyPress',
            [
                '$timeout',
                function directive($timeout) {
                    return function keyPress(scope, element, attributes) {
                        element.bind('keydown keypress', function bind(event) {
                            if (event.which === parseInt(attributes.keyCode, 10)) {
                                $timeout(function timeout() {
                                    scope.$apply(function apply() {
                                        scope.$eval(attributes.keyPress, {event: event});
                                    });
                                }, parseInt(attributes.timeout || 0, 10));

                                event.preventDefault();
                            }
                        });
                    };
                }
            ]
        );
}());