/**
 * Frontend application definition.
 *
 * This is the main file for the 'Frontend' application.
 *
 * @todo should these be done in separated files?
 */
(function() {
    'use strict';

    // Create frontend module and specify dependencies for that
    angular.module('frontend', [
        'angular-loading-bar',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.showErrors',
        'ui.utils',
        'angularMoment',
        'linkify',
        'sails.io',
        'toastr',
        'frontend-templates',
        'frontend.core',
        'frontend.examples',
        'frontend.admin',
        'frontend.auth',
        'frontend.example.navigation'
    ]);

    /**
     * Configuration for frontend application, this contains following main sections:
     *
     *  1) Configure $httpProvider and $sailsSocketProvider
     *  2) Set necessary HTTP and Socket interceptor(s)
     *  3) Turn on HTML5 mode on application routes
     *  4) Set up application routes
     */
    angular.module('frontend')
        .config(
            [
                '$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$sailsSocketProvider',
                '$tooltipProvider', 'cfpLoadingBarProvider',
                'toastrConfig',
                'AccessLevels',
                function config(
                    $stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $sailsSocketProvider,
                    $tooltipProvider, cfpLoadingBarProvider,
                    toastrConfig,
                    AccessLevels
                ) {
                    $httpProvider.defaults.useXDomain = true;

                    delete $httpProvider.defaults.headers.common['X-Requested-With'];

                    // Add interceptors for $httpProvider and $sailsSocketProvider
                    $httpProvider.interceptors.push('AuthInterceptor');
                    $httpProvider.interceptors.push('ErrorInterceptor');
                    $sailsSocketProvider.interceptors.push('AuthInterceptor');
                    $sailsSocketProvider.interceptors.push('ErrorInterceptor');

                    // Set tooltip options
                    $tooltipProvider.options({
                        appendToBody: true
                    });

                    cfpLoadingBarProvider.includeSpinner = false;

                    // Extend default toastr configuration with application specified configuration
                    angular.extend(
                        toastrConfig,
                        {
                            allowHtml: true,
                            closeButton: true,
                            extendedTimeOut: 3000
                        }
                    );

                    // Yeah we wanna to use HTML5 urls!
                    $locationProvider
                        .html5Mode(true)
                        .hashPrefix('!')
                    ;

                    // Routes that needs authenticated user
                    $stateProvider
                        .state('profile', {
                            abstract: true,
                            template: '<ui-view/>',
                            data: {
                                access: AccessLevels.user
                            }
                        })
                        .state('profile.edit', {
                            url: '/profile',
                            templateUrl: '/frontend/profile/profile.html',
                            controller: 'ProfileController'
                        })
                    ;

                    // For any unmatched url, redirect to /about
                    $urlRouterProvider.otherwise('/about');
                }
            ]
        );

    /**
     * Frontend application run hook configuration. This will attach auth status
     * check whenever application changes URL states.
     */
    angular.module('frontend')
        .run(
            [
                '$rootScope', '$state',
                'cfpLoadingBar',
                'Auth',
                function run(
                    $rootScope, $state,
                    cfpLoadingBar,
                    Auth
                ) {
                    /**
                     * Route state change start event, this is needed for following:
                     *  1) Loading bar start
                     *  2) Check if user is authenticated to see page
                     */
                    $rootScope.$on('$stateChangeStart', function stateChangeStart(event, toState) {
                        if (toState.resolve) {
                            cfpLoadingBar.start();
                        } else {
                            cfpLoadingBar.complete();
                        }

                        if (!Auth.authorize(toState.data.access)) {
                            event.preventDefault();

                            $state.go('auth.login');
                        }
                    });

                    /**
                     * Route state state success event, this is needed for following:
                     *  1) Loading bar complete event
                     */
                    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
                        cfpLoadingBar.complete();
                    });
                }
            ]
        );
}());
