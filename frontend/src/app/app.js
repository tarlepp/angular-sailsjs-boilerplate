/**
 * Frontend application definition.
 *
 * This is the main file for the 'Frontend' application.
 */
(function() {
  'use strict';

  // Create frontend module and specify dependencies for that
  angular.module('frontend', [
    'frontend-templates',
    'frontend.core',
    'frontend.examples',
    'frontend.admin',
    'frontend.auth'
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
    .config([
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

        /**
         * Default interceptor implementation, just copy paste from angular-loading-bar code. Waiting for cleaner
         * solution to handle this.
         *
         * @see https://github.com/chieffancypants/angular-loading-bar/issues/175
         */
        var interceptor = [
          '$q', '$cacheFactory', '$timeout', '$rootScope', '$log', 'cfpLoadingBar',
          function ($q, $cacheFactory, $timeout, $rootScope, $log, cfpLoadingBar) {
            // The total number of requests made
            var reqsTotal = 0;

            // The number of requests completed (either successfully or not)
            var reqsCompleted = 0;

            // The amount of time spent fetching before showing the loading bar
            var latencyThreshold = cfpLoadingBar.latencyThreshold;

            // $timeout handle for latencyThreshold
            var startTimeout;

            // calls cfpLoadingBar.complete() which removes the loading bar from the DOM.
            function setComplete() {
              $timeout.cancel(startTimeout);
              cfpLoadingBar.complete();
              reqsCompleted = 0;
              reqsTotal = 0;
            }

            /**
             * Determine if the response has already been cached
             *
             * @param  {Object}  config the config option from the request
             * @return {Boolean} returns true if cached, otherwise false
             */
            function isCached(config) {
              var cache;
              var defaultCache = $cacheFactory.get('$sailsSocket');
              var defaults = $sailsSocketProvider.defaults;

              // Choose the proper cache source. Borrowed from angular: $http service
              if ((config.cache || defaults.cache)
                && config.cache !== false
                && (config.method === 'GET' || config.method === 'JSONP')
              ) {
                cache = angular.isObject(config.cache) ? config.cache
                  : angular.isObject(defaults.cache) ? defaults.cache
                  : defaultCache;
              }

              var cached = cache !== undefined ? cache.get(config.url) !== undefined : false;

              if (config.cached !== undefined && cached !== config.cached) {
                return config.cached;
              }

              config.cached = cached;

              return cached;
            }

            return {
              'request': function(config) {
                // Check to make sure this request hasn't already been cached and that
                // the requester didn't explicitly ask us to ignore this request:
                if (!config.ignoreLoadingBar && !isCached(config)) {
                  $rootScope.$broadcast('cfpLoadingBar:loading', {url: config.url});

                  if (reqsTotal === 0) {
                    startTimeout = $timeout(function() {
                      cfpLoadingBar.start();
                    }, latencyThreshold);
                  }

                  reqsTotal++;
                  cfpLoadingBar.set(reqsCompleted / reqsTotal);
                }

                return config;
              },

              'response': function(response) {
                if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
                  reqsCompleted++;

                  $rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});

                  if (reqsCompleted >= reqsTotal) {
                    setComplete();
                  } else {
                    cfpLoadingBar.set(reqsCompleted / reqsTotal);
                  }
                }

                return response;
              },

              'responseError': function(rejection) {
                if (!rejection.config) {
                  $log.error('Other interceptors are not returning config object \n https://github.com/chieffancypants/angular-loading-bar/pull/50');
                }

                if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
                  reqsCompleted++;
                  $rootScope.$broadcast('cfpLoadingBar:loaded', {url: rejection.config.url, result: rejection});

                  if (reqsCompleted >= reqsTotal) {
                    setComplete();
                  } else {
                    cfpLoadingBar.set(reqsCompleted / reqsTotal);
                  }
                }

                return $q.reject(rejection);
              }
            };
          }
        ];

        $sailsSocketProvider.interceptors.push(interceptor);

        // Set tooltip options
        $tooltipProvider.options({
          appendToBody: true
        });

        // Disable spinner from cfpLoadingBar
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 200;

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
          .html5Mode({
            enabled: true,
            requireBase: false
          })
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

        // Main state provider for frontend application
        $stateProvider
          .state('frontend', {
            abstract: true,
            views: {
              header: {
                templateUrl: '/frontend/core/layout/partials/header.html',
                controller: 'HeaderController'
              },
              footer: {
                templateUrl: '/frontend/core/layout/partials/footer.html',
                controller: 'FooterController'
              }
            }
          })
        ;

        // For any unmatched url, redirect to /about
        $urlRouterProvider.otherwise('/about');
      }
    ])
  ;

  /**
   * Frontend application run hook configuration. This will attach auth status
   * check whenever application changes URL states.
   */
  angular.module('frontend')
    .run([
      '$rootScope', '$state', '$injector',
      'editableOptions',
      'Auth',
      function run(
        $rootScope, $state, $injector,
        editableOptions,
        Auth
      ) {
        // Set usage of Bootstrap 3 CSS with angular-xeditable
        editableOptions.theme = 'bs3';

        /**
         * Route state change start event, this is needed for following:
         *  1) Check if user is authenticated to access page, and if not redirect user back to login page
         */
        $rootScope.$on('$stateChangeStart', function stateChangeStart(event, toState) {
          if (!Auth.authorize(toState.data.access)) {
            event.preventDefault();

            $state.go('auth.login');
          }
        });

        // Check for state change errors.
        $rootScope.$on('$stateChangeError', function stateChangeError(event, toState, toParams, fromState, fromParams, error) {
          event.preventDefault();

          $injector.get('MessageService')
            .error('Error loading the page');

          $state.get('error').error = {
            event: event,
            toState: toState,
            toParams: toParams,
            fromState: fromState,
            fromParams: fromParams,
            error: error
          };

          return $state.go('error');
        });
      }
    ])
  ;
}());
