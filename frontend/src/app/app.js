(function() {
    'use strict';

    angular.module('frontend', [
        'ngCookies',
        'ui.router',
        'ui.bootstrap'
    ]);

    angular.module('frontend')
        .config(
            [
                '$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', 'USER_ROLES',
                function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, USER_ROLES) {
                    $httpProvider.defaults.useXDomain = true;
                    delete $httpProvider.defaults.headers.common['X-Requested-With'];

                    $httpProvider
                        .interceptors
                            .push([
                                '$injector',
                                function($injector) {
                                    return $injector.get('AuthInterceptor');
                                }
                            ]);

                    $httpProvider
                        .interceptors
                            .push([
                                '$injector',
                                function($injector) {
                                    return $injector.get('CORSInterceptor');
                                }
                            ]);

                    $locationProvider
                        .html5Mode(true)
                        .hashPrefix('!');

                    // For any unmatched url, redirect to /state1
                    $urlRouterProvider.otherwise('index');

                    // Now set up the states
                    $stateProvider
                        .state('index', {
                            url: '',
                            templateUrl: '/partials/main.html',
                            data: {
                                authorizedRoles: []
                            }
                        })
                        .state('login', {
                            url: '/login',
                            templateUrl: '/partials/login.html',
                            controller: 'SignInController'
                        })
                        .state('state2', {
                            url: '/state2',
                            templateUrl: '/partials/state2.html',
                            data: {
                                authorizedRoles: [USER_ROLES.all]
                            }
                        })
                        .state('state2.list', {
                            url: '/list',
                            templateUrl: '/partials/state2.list.html',
                            data: {
                                authorizedRoles: [USER_ROLES.all]
                            },
                            controller: function($scope) {
                                $scope.things = ['A', 'Set', 'Of', 'Things'];
                            }
                        });

                }
            ]
        );

    angular.module('frontend')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        });

    angular.module('frontend')
        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin'
        });

    angular.module('frontend')
        .run([
            '$rootScope', '$state', 'AuthService', 'AUTH_EVENTS',
            function($rootScope, $state, AuthService, AUTH_EVENTS) {
                if (!AuthService.isAuthenticated()) {
                    console.log("ddd");

                    $state.go('login');

                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }

                $rootScope.$on('$stateChangeStart', function(event, next) {
                    var authorizedRoles = next.data.authorizedRoles;

                    if (!AuthService.isAuthorized(authorizedRoles)) {
                        event.preventDefault();

                        if (AuthService.isAuthenticated()) { // user is not allowed
                            console.log('not allowed');
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        } else { // user is not logged in
                            console.log('not signed in');
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        }
                    }
                });
            }
        ]);
}());
