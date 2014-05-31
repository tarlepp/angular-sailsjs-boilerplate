/**
 * Simple service to activate noty2 message to GUI. This service can be used every where in application. Generally
 * all $http and $socket queries uses this service to show specified errors to user.
 *
 * Service can be used as in following examples (assuming that you have inject this service to your controller):
 *  Message.success(message, [options]);
 *  Message.error(message, [options]);
 *  Message.message(message, [options]);
 *
 * Feel free to be happy and code some awesome stuff!
 *
 * @todo do we need some queue dismiss?
 */
(function() {
    'use strict';

    angular.module('frontend.services')
        .factory('Message',
            function() {
                var service = {};

                /**
                 * Method to generate default 'success' message with noty. Note that this method eventually uses
                 * this instance 'service.message' method.
                 *
                 * @param   {string}    message Message to show
                 * @param   {{}}        options Message options
                 */
                service.success = function(message, options) {
                    options = options || {};

                    var defaultOptions = {
                        type: 'success',
                        timeout: 2000
                    };

                    service.message(message, _.assign(defaultOptions, options));
                };

                /**
                 * Method to generate default 'error' message with noty. Note that this method eventually uses
                 * this instance 'service.message' method.
                 *
                 * @param   {string}    message Message to show
                 * @param   {{}}        options Message options
                 */
                service.error = function(message, options) {
                    options = options || {};

                    var defaultOptions = {
                        type: 'error',
                        timeout: 4000
                    };

                    service.message(message, _.assign(defaultOptions, options));
                };

                /**
                 * Generic noty message generator method that will activate actual noty message with specified
                 * options. Note that all other methods on this message controller uses this main method.
                 *
                 * @param   {string}    message Message to show
                 * @param   {{}}        options Message options
                 */
                service.message = function(message, options) {
                    options = options || {};

                    var defaultOptions = {
                        text: message,
                        layout: 'top',
                        timeout: 3000
                    };

                    noty(_.assign(defaultOptions, options));
                };

                return service;
            }
        );
}());
