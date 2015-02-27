/**
 * Current user data service within this you can access to currently signed in user data.
 * Note that if you wanna be secure about this you have to also use 'Auth' service in your
 * views.
 *
 * Usage example in controller:
 *  angular
 *    .module('app')
 *    .controller('SomeController',[
 *      '$scope', 'Auth', 'CurrentUser',
 *      function controller($scope, Auth, CurrentUser) {
 *        $scope.auth = Auth;
 *        $scope.user = CurrentUser.user;
 *      }
 *    ])
 *  ;
 *
 * Usage example in view:
 *  <div data-ng-show="auth.isAuthenticated()">
 *      Hello, <strong>{{user().email}}</strong>
 *  </div>
 *
 * Happy coding!
 */
(function() {
  'use strict';

  angular.module('frontend.core.services')
    .factory('CurrentUser', [
      '$localStorage',
      function factory($localStorage) {
        return {
          user: function user() {
            return $localStorage.credentials ? $localStorage.credentials.user : {};
          }
        };
      }
    ])
  ;
}());
