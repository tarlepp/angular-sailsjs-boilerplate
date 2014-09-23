/**
 * Interceptor fot $http and $sailSocket request to handle possible errors and show
 * that error to user automatic. Message is shown by application 'Message' service
 * which uses noty library.
 *
 * @todo Add option to skip automatic error message show
 */
(function() {
    'use strict';

    angular.module('frontend.interceptors')
        .factory('ErrorInterceptor',
            [
                '$q',
                'Message',
                function($q,
                         Message
                    ) {
                    return {
                        /**
                         * Interceptor method which is triggered whenever response occurs on $http queries. Note
                         * that this has some sails.js specified hack for errors that returns HTTP 200 status.
                         *
                         * This is maybe sails.js bug, but I'm not sure of that.
                         *
                         * @param   {*} response
                         *
                         * @returns {Promise}
                         */
                        response: function(response) {
                            if (response.data.status && response.data.status !== 200) {
                                return $q.reject(response);
                            } else {
                                return response || $q.when(response);
                            }
                        },

                        /**
                         * Interceptor method that is triggered whenever response error occurs on $http requests.
                         *
                         * @param   {*} response
                         *
                         * @returns {Promise}
                         */
                        responseError: function(response) {
                            var message = '';

                            if (response.data.error) {
                                message = response.data.error;
                            } else if (response.data.message) {
                                message = response.data.message;
                            } else {
                                if (typeof response.data === 'string') {
                                    message = response.data;
                                } else if (response.statusText) {
                                    message = response.statusText;
                                }

                                message = message + ' <span class="text-medium">(HTTP status ' + response.status + ')</span>';
                            }

                            if (message) {
                                Message.error(message);
                            }

                            return $q.reject(response);
                        }
                    };
                }
            ]
        );
}());
