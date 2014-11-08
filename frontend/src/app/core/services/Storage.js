/**
 * Simple storage service which uses browser localStorage service to store
 * application data. Main usage of this is to store user data and JWT token
 * to browser.
 *
 * But this can be also used to cache some data from backend to users browser
 * cache, just remember that local storage IS NOT intended to store "large"
 * amounts of data.
 */
(function() {
    'use strict';

    angular.module('frontend.core.services')
        .factory('Storage', function service() {
            return {
                /**
                 * Storage service method to get specified key value from local storage.
                 *
                 * @param   {string}    key
                 *
                 * @returns {*}
                 */
                'get': function get(key) {
                    return localStorage.getItem(key);
                },

                /**
                 * Storage service method to set specified data to local storage with given key.
                 *
                 * @param   {string}    key
                 * @param   {*}         value
                 *
                 * @returns {*}
                 */
                'set': function set(key, value) {
                    return localStorage.setItem(key, value);
                },

                /**
                 * Storage service method to unset specified key value from local storage.
                 *
                 * @param   {string}    key
                 *
                 * @returns {*}
                 */
                'unset': function unset(key) {
                    return localStorage.removeItem(key);
                }
            };
        });
}());
