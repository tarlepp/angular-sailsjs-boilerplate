/**
 * Angular service to inject noty to your angular.js application.
 *
 *  - http://ned.im/noty/
 *
 * Usage example in controller:
 *
 *  angular
 *      .module('app')
 *      .controller('SomeController',
 *          [
 *              '$scope', 'Noty',
 *              function ($scope, Noty) {
 *                  new Noty({text: 'some message here'});
 *              }
 *          ]
 *      );
 *
 * With this you can use noty library easily in your controllers with angular way.
 */
(function() {
    'use strict';

    angular.module('frontend.components')
        .factory('Noty',
            [
                '$window',
                function($window) {
                    return $window.noty;
                }
            ]
        );
}());
