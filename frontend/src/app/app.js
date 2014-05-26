(function() {
    'use strict';

    angular.module('frontend', [
        'ngCookies',
        'ui.router',
        'ui.bootstrap',
        'frontend.controllers',
        'frontend.directives',
        'frontend.interceptors',
        'frontend.services',
    ]);

    angular.module('frontend.controllers', []);
    angular.module('frontend.directives', []);
    angular.module('frontend.filters', []);
    angular.module('frontend.interceptors', []);
    angular.module('frontend.services', []);

    angular.module('frontend')
        .config(
            [
                '$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', 'AccessLevels',
                function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, AccessLevels) {
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

                    $locationProvider
                        .html5Mode(true)
                        .hashPrefix('!');

                    // Now set up the states
                    $stateProvider
                        .state('anon', {
                            abstract: true,
                            template: '<ui-view/>',
                            data: {
                                access: AccessLevels.anon
                            }
                        })
                        .state('anon.login', {
                            url: '/login',
                            templateUrl: '/partials/login/main.html',
                            controller: 'LoginController'
                        });

                    $stateProvider
                        .state('board', {
                            abstract: true,
                            template: '<ui-view/>',
                            data: {
                                access: AccessLevels.user
                            }
                        })
                        .state('board.books', {
                            url: '/books',
                            templateUrl: '/partials/books/main.html',
                            controller: 'BooksController'
                        });

                    // For any unmatched url, redirect to /state1
                    $urlRouterProvider.otherwise('/login');
                }
            ]
        );

    angular.module('frontend')
        .run([
            '$rootScope', '$state', 'Auth',
            function($rootScope, $state, Auth) {
                // And when ever route changes we must check authenticate status
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    if (!Auth.authorize(toState.data.access)) {
                        event.preventDefault();

                        $state.go('anon.login');
                    }
                });
            }
        ]);
}());
