/**
 * @todo
 *  1) Add documentation
 *  2) And why the hell this doesn't work without this interceptor?
 */
(function() {
    'use strict';

    angular.module('frontend.core.interceptors')
        .factory('LoaderInterceptor',
        [
            '$q', '$timeout', 'cfpLoadingBar',
            function($q, $timeout, cfpLoadingBar) {
                return {
                    request: function callback(config) {
                        cfpLoadingBar.start();

                        return config || $q.when(config);
                    },
                    response: function callback(response) {
                        cfpLoadingBar.complete();

                        return response || $q.when(response);
                    },
                    responseError: function callback(response) {
                        cfpLoadingBar.complete();

                        return $q.reject(response);
                    }
                };
            }
        ]
    );
}());
