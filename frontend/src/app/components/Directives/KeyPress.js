/**
 * Directive to bind some scope method to certain element and key code. Example this directive
 * can be used to submit form data from input fields by pressing [enter].
 *
 * Usage example:
 *
 *  <input id="message" name="message" class="form-control" type="text"
 *      data-key-press="postMessage()"
 *      data-key-code="13"
 *      data-ng-model="message.message"
 *  />
 *
 * Example above triggers 'postMessage' scope function when user presses [enter] key.
 *
 * @todo Do we need some timeout between key presses?
 */
(function() {
    'use strict';

    angular.module('frontend.directives')
        .directive('keyPress', function() {
            return function(scope, element, attributes) {
                element.bind('keydown keypress', function(event) {
                    if (event.which === parseInt(attributes.keyCode)) {
                        scope.$apply(function() {
                            scope.$eval(attributes.keyPress, {'event': event});
                        });

                        event.preventDefault();
                    }
                });
            };
        });
}());