/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.login-history' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  angular.module('frontend.admin.login-history')
    .controller('LoginHistoryController', [
      '$scope', '$timeout', '$q', '$filter',
      '_',
      'ListConfig',
      'SocketHelperService',
      'LoginHistoryModel',
      '_items', '_count', '_statsBrowser', '_statsOS', '_statsUser',
      function controller(
        $scope, $timeout, $q, $filter,
        _,
        ListConfig,
        SocketHelperService,
        LoginHistoryModel,
        _items, _count, _statsBrowser, _statsOS, _statsUser
      ) {
        // Set current scope reference to models
        LoginHistoryModel.setScope($scope, false, 'items', 'itemCount');

        // Store statistics
        $scope.statsBrowser = _statsBrowser;
        $scope.statsOS = _statsOS;
        $scope.statsUser = _statsUser;

        // Add default list configuration variable to current scope
        $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

        // Set initial data
        $scope.items = _items;
        $scope.itemCount = _count.count;

        // Initialize used title items
        $scope.titleItems = ListConfig.getTitleItems(LoginHistoryModel.endpoint);

        // Initialize default sort data
        $scope.sort = {
          column: 'createdAt',
          direction: false
        };

        // Initialize filters
        $scope.filters = {
          searchWord: '',
          columns: $scope.titleItems
        };

        // Define default chart configuration for each statistics chart
        var chartConfig = {
          options: {
            chart: {
              type: 'pie'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: false
                },
                showInLegend: true
              }
            },
            exporting: {
              enabled: false
            },
            tooltip: {
              formatter: function formatter() {
                return '<strong>' + this.key + '</strong><br />' +
                  'Percentage: ' + $filter('number')(this.point.percentage, 2) + '%<br />' +
                  'Total: ' + $filter('number')(this.y)
                ;
              },
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            }
          },
          title: {
            text: ''
          },
          series: [{
            type: 'pie',
            name: '',
            data: []
          }]
        };

        var charts = [
          {
            scope: 'chartBrowser',
            data: 'statsBrowser',
            title: 'Browsers'
          },
          {
            scope: 'chartOs',
            data: 'statsOS',
            title: 'Operating systems'
          },
          {
            scope: 'chartUser',
            data: 'statsUser',
            title: 'Users'
          }
        ];

        _.forEach(charts, function iterator(config) {
          $scope[config.scope] = angular.copy(chartConfig);

          $scope[config.scope].series[0].data = $scope[config.data];
          $scope[config.scope].title.text = config.title;
        });

        // Function to change sort column / direction on list
        $scope.changeSort = function changeSort(item) {
          var sort = $scope.sort;

          if (sort.column === item.column) {
            sort.direction = !sort.direction;
          } else {
            sort.column = item.column;
            sort.direction = true;
          }

          _triggerFetchData();
        };

        // Watcher for items, this is needed to update charts
        $scope.$watch('items', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            var actions = [
              {
                action: 'Browser',
                scope: 'chartBrowser'
              },
              {
                action: 'OS',
                scope: 'chartOs'
              },
              {
                action: 'User',
                scope: 'chartUser'
              }
            ];

            // Create necessary promises to update chart data
            var promises = _.map(actions, function iterator(config) {
              LoginHistoryModel
                .statistics(config.action)
                .then(
                  function onSuccess(data) {
                    $scope[config.scope].series[0].data = data;
                  }
                )
              ;
            });

            // Execute all promises
            $q.all(promises);
          }
        });

        // Simple watcher for 'currentPage' scope variable. If this is changed we need to fetch book data from server.
        $scope.$watch('currentPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _fetchData();
          }
        });

        // Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch book data from server.
        $scope.$watch('itemsPerPage', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            _triggerFetchData();
          }
        });

        var searchWordTimer;

        /**
         * Watcher for 'filter' scope variable, which contains multiple values that we're interested
         * within actual GUI. This will trigger new data fetch query to server if following conditions
         * have been met:
         *
         *  1) Actual filter variable is different than old one
         *  2) Search word have not been changed in 400ms
         *
         * If those are ok, then watcher will call 'fetchData' function.
         */
        $scope.$watch('filters', function watcher(valueNew, valueOld) {
          if (valueNew !== valueOld) {
            if (searchWordTimer) {
              $timeout.cancel(searchWordTimer);
            }

            searchWordTimer = $timeout(_triggerFetchData, 400);
          }
        }, true);

        /**
         * Helper function to trigger actual data fetch from backend. This will just check current page
         * scope variable and if it is 1 call 'fetchData' function right away. Any other case just set
         * 'currentPage' scope variable to 1, which will trigger watcher to fetch data.
         *
         * @private
         */
        function _triggerFetchData() {
          if ($scope.currentPage === 1) {
            _fetchData();
          } else {
            $scope.currentPage = 1;
          }
        }

        /**
         * Helper function to fetch actual data for GUI from backend server with current parameters:
         *  1) Current page
         *  2) Search word
         *  3) Sort order
         *  4) Items per page
         *
         * Actually this function is doing two request to backend:
         *  1) Data count by given filter parameters
         *  2) Actual data fetch for current page with filter parameters
         *
         * These are fetched via 'LoginHistoryModel' service with promises.
         *
         * @private
         */
        function _fetchData() {
          $scope.loading = true;

          // Common parameters for count and data query
          var commonParameters = {
            where: SocketHelperService.getWhere($scope.filters),
            populate: 'user'
          };

          // Data query specified parameters
          var parameters = {
            limit: $scope.itemsPerPage,
            skip: ($scope.currentPage - 1) * $scope.itemsPerPage,
            sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
          };

          // Fetch data count
          var count = LoginHistoryModel
            .count(commonParameters)
            .then(
              function onSuccess(response) {
                $scope.itemCount = response.count;
              }
            )
          ;

          // Fetch actual data
          var load = LoginHistoryModel
            .load(_.merge({}, commonParameters, parameters))
            .then(
              function onSuccess(response) {
                $scope.items = response;
              }
            )
          ;

          // Load all needed data
          $q
            .all([count, load])
            .finally(
              function onFinally() {
                $scope.loaded = true;
                $scope.loading = false;
              }
            )
          ;
        }
      }
    ])
  ;
}());
