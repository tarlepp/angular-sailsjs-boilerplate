/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.login-history' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
    'use strict';

    angular.module('frontend.admin.login-history')
        .controller('LoginHistoryController',
            [
                '$scope',
                '_historyData',
                function controller(
                    $scope,
                    _historyData
                ) {
                    $scope.historyData = _historyData;
                }
            ]
        );
}());
