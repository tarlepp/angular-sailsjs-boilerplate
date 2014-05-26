/**
 * Simple storage service which uses browser localStorage service to store
 * application data. Main usage of this is to store user data and JWT token
 * to browser.
 */
(function() {
    'use strict';

    angular.module('frontend.services')
        .factory('Storage', function() {
            return {
                get: function(key) {
                    return localStorage.getItem(key);
                },
                set: function(key, val) {
                    return localStorage.setItem(key, val);
                },
                unset: function(key) {
                    return localStorage.removeItem(key);
                }
            };
        });
}());
