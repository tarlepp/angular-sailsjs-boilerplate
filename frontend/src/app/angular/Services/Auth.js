/**
 * Auth service which is used to authenticate users with backend server and provide simple
 * methods to check if user is authenticated or not.
 *
 * Within successfully login process service will store user data and JWT token to local
 * storage where those are accessible in the application.
 *
 * This service provides following methods:
 *
 *  Auth.authorize(access)
 *  Auth.isAuthenticated()
 *  Auth.login(credentials)
 *  Auth.logout()
 *
 * You can use this service fairly easy on your controllers and views if you like to. It's
 * recommend that you use this service with 'CurrentUser' service in your controllers and
 * views.
 *
 * Usage example in controller:
 *
 *  angular
 *      .module('app')
 *      .controller('SomeController',
 *          [
 *              '$scope', 'Auth', 'CurrentUser',
 *              function ($scope, Auth, CurrentUser) {
 *                  $scope.auth = Auth;
 *                  $scope.user = CurrentUser.user;
 *              }
 *          ]
 *      );
 *
 * Usage example in view:
 *
 *  <div data-ng-show="auth.isAuthenticated()">
 *      Hello, <strong>{{user().email}}</strong>
 *  </div>
 *
 * Happy coding!
 *
 * @todo    Revoke method?
 */
(function() {
    'use strict';

    angular.module('frontend.services')
        .factory('Auth',
            [
                '$http', '$state',
                'Storage', 'AccessLevels', 'BackendConfig', 'Message',
                function($http, $state,
                         Storage, AccessLevels, BackendConfig, Message
                ) {
                    return {
                        /**
                         * Method to authorize current user with given access level in application.
                         *
                         * @param   {Number}    accessLevel Access level to check
                         *
                         * @returns {Boolean}
                         */
                        authorize: function authorize(accessLevel) {
                            if (accessLevel === AccessLevels.user) {
                                return Boolean(this.isAuthenticated());
                            } else if (accessLevel === AccessLevels.admin) {
                                return Boolean(this.isAuthenticated()) && Boolean(angular.fromJson(Storage.get('auth_token')).user.admin);
                            } else {
                                return true;
                            }
                        },

                        /**
                         * Method to check if current user is authenticated or not. This will just
                         * simply call 'Storage' service 'get' method and returns it results.
                         *
                         * @returns {*}
                         */
                        isAuthenticated: function isAuthenticated() {
                            return Storage.get('auth_token');
                        },

                        /**
                         * Method make login request to backend server. Successfully response from
                         * server contains user data and JWT token as in JSON object. After successful
                         * authentication method will store user data and JWT token to local storage
                         * where those can be used.
                         *
                         * @param   {*} credentials
                         *
                         * @returns {*|Promise}
                         */
                        login: function login(credentials) {
                            return $http
                                .post(BackendConfig.url + '/login', credentials, {withCredentials: true})
                                .then(function(response) {
                                    Message.success('You have been logged in.');

                                    Storage.set('auth_token', JSON.stringify(response.data));
                                });
                        },

                        /**
                         * The backend doesn't care about actual user logout, just delete the token
                         * and you're good to go.
                         *
                         * Question still: Should we still make logout process to backend side?
                         */
                        logout: function logout() {
                            Storage.unset('auth_token');

                            Message.success('You have been logged out.');

                            $state.go('anon.login');
                        }
                    };
                }
            ]
        );
}());
