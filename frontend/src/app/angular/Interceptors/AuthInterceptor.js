/**
 * Auth interceptor for HTTP and Socket request. This interceptor will add required
 * JWT (Json Web Token) token to each requests. That token is validated in server side
 * application.
 *
 * @see http://angular-tips.com/blog/2014/05/json-web-tokens-introduction/
 * @see http://angular-tips.com/blog/2014/05/json-web-tokens-examples/
 *
 * @todo Add error message show via some MessageService
 */
(function() {
    'use strict';

    angular.module('frontend.interceptors')
        .factory('AuthInterceptor',
            [
                '$q', '$injector', 'Storage',
                function($q, $injector, Storage) {
                    return {
                        /**
                         * Interceptor method for $http requests. Main purpose of this method is to add JWT token
                         * to every request that application does.
                         *
                         * @param   {*} config
                         *
                         * @returns {*}
                         */
                        request: function(config) {
                            var token;

                            if (Storage.get('auth_token')) {
                                token = angular.fromJson(Storage.get('auth_token')).token;
                            }

                            if (token) {
                                config.headers.Authorization = 'Bearer ' + token;
                            }

                            return config;
                        },

                        /**
                         * Interceptor method that is triggered whenever response error occurs on $http requests.
                         *
                         * @param   {*} response
                         *
                         * @returns {Promise}
                         */
                        responseError: function(response) {
                            if (response.status === 401 || response.status === 403) {
                                Storage.unset('auth_token');

                                $injector.get('$state').go('anon.login');
                            }

                            return $q.reject(response);
                        }
                    };
                }
            ]
        );
}());
