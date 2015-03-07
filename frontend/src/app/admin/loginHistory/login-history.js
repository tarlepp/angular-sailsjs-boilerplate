/**
 * Login history component. This component is divided to following logical components:
 *
 *  Controllers
 *
 * All of these are wrapped to 'frontend.admin.login-history' angular module. This also contains necessary route
 * definitions for this module.
 */
(function() {
  'use strict';

  // Define frontend.admin module.login-history
  angular.module('frontend.admin.login-history', []);

  // Module configuration
  angular.module('frontend.admin.login-history')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('admin.login-history', {
            url: '/admin/loginHistory',
            views: {
              'content@': {
                templateUrl: '/frontend/admin/loginHistory/index.html',
                controller: 'LoginHistoryController',
                resolve: {
                  _items: [
                    'ListConfig',
                    'LoginHistoryModel',
                    function resolve(
                      ListConfig,
                      LoginHistoryModel
                    ) {
                      var config = ListConfig.getConfig();

                      var parameters = {
                        limit: config.itemsPerPage,
                        sort: 'createdAt DESC',
                        populate: 'user'
                      };

                      return LoginHistoryModel.load(parameters);
                    }
                  ],
                  _count: [
                    'LoginHistoryModel',
                    function resolve(LoginHistoryModel) {
                      return LoginHistoryModel.count();
                    }
                  ],
                  _statsBrowser: [
                    'LoginHistoryModel',
                    function resolve(LoginHistoryModel) {
                      return LoginHistoryModel.statistics('Browser');
                    }
                  ],
                  _statsOS: [
                    'LoginHistoryModel',
                    function resolve(LoginHistoryModel) {
                      return LoginHistoryModel.statistics('OS');
                    }
                  ],
                  _statsUser: [
                    'LoginHistoryModel',
                    function resolve(LoginHistoryModel) {
                      return LoginHistoryModel.statistics('User');
                    }
                  ]
                }
              }
            }
          })
        ;
      }
    ])
  ;
}());
