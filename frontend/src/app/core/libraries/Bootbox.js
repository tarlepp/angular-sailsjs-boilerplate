/**
 * Angular service to inject bootbox.js library to your controllers.
 *
 * Usage example in controller:
 *
 *  angular
 *      .module('app')
 *      .controller('SomeController',
 *          [
 *              '$scope', 'bootbox',
 *              function ($scope, bootbox) {
 *                  bootbox.confirm("Are you sure?", function (result) {
 *                      return true;
 *                  });
 *              }
 *          ]
 *      );
 *
 * With this you can use bootbox.js library easily in your controllers.
 *
 * Note:    This is basically dummy copy from https://github.com/danicomas/angular-bootbox, because there isn't yet
 *          bower package for this. Remove this when it's ready.
 */
(function() {
    'use strict';

    angular.module('frontend.core.libraries')
        .factory('bootbox',
            [
                '$window',
                function factory($window) {
                    return $window.bootbox;
                }
            ]
        )
        .provider('$bootbox',
            [
                function provider() {
                    return {
                        setDefaults: function setDefaults(options) {
                            bootbox.setDefaults(options);
                        },
                        $get: function get() {
                            return {};
                        }
                    };
                }
            ]
        );
}());
