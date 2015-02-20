/**
 * @todo
 *  1) Add documentation
 *  2) And why the hell this doesn't work without this interceptor?
 */
(function() {
  'use strict';

  angular.module('frontend.core.interceptors')
    .factory('LoaderInterceptor', [
      '$q', '$timeout',
      'cfpLoadingBar',
      function factory(
        $q, $timeout,
        cfpLoadingBar
      ) {
        return {
          request: function request(config) {
            cfpLoadingBar.start();

            return config || $q.when(config);
          },
          response: function response(response) {
            cfpLoadingBar.complete();

            return response || $q.when(response);
          },
          responseError: function responseError(response) {
            cfpLoadingBar.complete();

            return $q.reject(response);
          }
        };
      }
    ])
  ;
}());
