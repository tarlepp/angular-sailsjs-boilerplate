/**
 * Generic data service to interact with Sails.js backend.
 *
 * @todo Add support for generic POST, PUT and DELETE
 * @todo Do we need to check that BackendConfig.url is set
 */
(function() {
    'use strict';

    angular.module('frontend.services')
        .factory('DataService',
            [
                '$q', '$sailsSocket', 'BackendConfig',
                function($q, $sailsSocket, BackendConfig) {
                    /**
                     * Helper function to get "proper" end point url for sails backend API.
                     *
                     * @param   {string}    endPoint    Name of the end point
                     *
                     * @returns {string}
                     */
                    function parseEndPointUrl(endPoint) {
                        return BackendConfig.url + '/' + endPoint;
                    }

                    /**
                     * Helper function to parse used parameters in 'get' and 'count' methods.
                     *
                     * @param   {{}}    parameters  Used query parameters
                     *
                     * @returns {{params: {}}}
                     */
                    function parseParameters(parameters) {
                        parameters = parameters || {};

                        return {params: parameters};
                    }

                    return {
                        /**
                         * Service method to get count of certain end point objects.
                         *
                         * @param   {string}    endPoint    Name of the end point
                         * @param   {{}}        parameters  Used query parameters
                         *
                         * @returns {HttpPromise}
                         */
                        count: function(endPoint, parameters) {
                            parameters = parameters || {};

                            return $sailsSocket.get(parseEndPointUrl(endPoint) + '/count/', parseParameters(parameters));
                        },

                        /**
                         * Service method to get data from certain end point. This will always return a collection
                         * of data.
                         *
                         * @param   {string}    endPoint    Name of the end point
                         * @param   {{}}        parameters  Used query parameters
                         *
                         * @returns {HttpPromise}
                         */
                        get: function(endPoint, parameters) {
                            parameters = parameters || {};

                            return $sailsSocket.get(parseEndPointUrl(endPoint), parseParameters(parameters));
                        },

                        /**
                         * Service method to get data from certain end point. This will return just a one
                         * record as an object.
                         *
                         * @param   {string}    endPoint    Name of the end point
                         * @param   {{}}        parameters  Used query parameters
                         *
                         * @returns {HttpPromise}
                         */
                        getOne: function(endPoint, parameters) {
                            parameters = parameters || {};

                            var deferred = $q.defer();

                            $sailsSocket
                                .get(parseEndPointUrl(endPoint), parseParameters(parameters))
                                .success(function(data) {
                                    deferred.resolve(data[0] || data);
                                });

                            return deferred.promise;
                        }
                    };
                }
            ]
        );
}());