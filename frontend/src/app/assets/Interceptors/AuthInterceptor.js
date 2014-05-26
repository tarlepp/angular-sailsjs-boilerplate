/**
 * Auth interceptor for HTTP and Socket request. This interceptor will add required
 * JWT (Json Web Token) token to each requests. That token is validated in server side
 * application.
 *
 * @see http://angular-tips.com/blog/2014/05/json-web-tokens-introduction/
 * @see http://angular-tips.com/blog/2014/05/json-web-tokens-examples/
 */
(function() {
    'use strict';

    angular.module('frontend.interceptors')
        .factory('AuthInterceptor',
            [
                '$q', '$injector', 'Storage',
                function($q, $injector, Storage) {
                    return {
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
