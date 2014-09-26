/**
 * Model for Message API, this is used to wrap all Message objects specified actions and
 * data change actions.
 *
 * @todo about 99% of this code is same for all models, figure out to avoid this
 */
(function() {
    'use strict';

    angular.module('frontend.models')
        .factory('MessageModel',
            [
                '$sailsSocket',
                '_',
                'DataService',
                function($sailsSocket,
                         _,
                         DataService
                ) {
                    // We need to specify current model endpoint
                    var endpoint = 'message';

                    // Subscribe to specified endpoint for socket messages
                    $sailsSocket
                        .subscribe(endpoint, function(message) {
                            if (handlers[message.verb]) {
                                handlers[message.verb](message);
                            } else {
                                console.log('Implement handling for \'' + message.verb + '\' socket messages');
                            }
                        });

                    /**
                     * Sails socket action handlers. These are called whenever following event
                     * happens on current model:
                     *  - record is created
                     *  - record is updated
                     *  - record is deleted
                     *
                     * Purpose of these handlers is to "update" current model data according to
                     * event that has fired.
                     *
                     * @type    {{
                     *              created: Function,
                     *              updated: Function,
                     *              deleted: Function
                     *          }}
                     */
                    var handlers = {
                        'created': function recordCreated(message) {
                            console.log('recordCreated', endpoint, message);

                            model.messages.push(message.data);
                        },
                        'updated': function recordUpdated(message) {
                            console.log('recordUpdated', endpoint, message);
                        },
                        'deleted': function recordDeleted(message) {
                            console.log('recordDeleted', endpoint, message);
                        }
                    };

                    /**
                     * Actual model service, that contains all necessary CRUD functions and actual
                     * data on it. This object itself is returned from this service.
                     *
                     * @type    {{
                     *              message: {},
                     *              messages: Array,
                     *              count: Function,
                     *              load: Function,
                     *              fetch: Function,
                     *              create: Function,
                     *              update: Function,
                     *              delete: Function
                     *          }}
                     */
                    var model = {
                        'message': {},
                        'messages': [],

                        /**
                         * Service function to return count of messages with specified parameters.
                         *
                         * @param   {{}}    [parameters]    Load parameters
                         *
                         * @returns {Promise|models.count}
                         */
                        'count': function count(parameters) {
                            return DataService
                                .count(endpoint, parameters)
                                .then(
                                    function(response) {
                                        return response.data;
                                    }
                                );
                        },

                        /**
                         * Service function to load message data from database and store those to current instance
                         * of service.
                         *
                         * @param   {{}}    [parameters]    Load parameters
                         *
                         * @returns {Promise|models.message[]}
                         */
                        'load': function load(parameters) {
                            return DataService
                                .collection(endpoint, parameters)
                                .then(
                                    function(response) {
                                        model.messages = response.data;

                                        return model.messages;
                                    }
                                );
                        },

                        /**
                         * Service function to load single message data from database and store it to current
                         * instance of service.
                         *
                         * @param   {number}    identifier      Message id number
                         * @param   {{}}        [parameters]    Load parameters
                         *
                         * @returns {Promise|models.message}
                         */
                        'fetch': function fetchRecords(identifier, parameters) {
                            return DataService
                                .fetch(endpoint, identifier, parameters)
                                .then(
                                    function (response) {
                                        model.message = response.data;

                                        return model.message;
                                    }
                                );
                        },

                        /**
                         * Service function to create new message to database.
                         *
                         * @param   {models.message}    data   Message data to create
                         *
                         * @returns {Promise|models.message}
                         */
                        'create': function createRecord(data) {
                            return DataService
                                .create(endpoint, data)
                                .then(
                                    function(response) {
                                        handlers.created({data: response.data, id: response.data.id});

                                        return response.data;
                                    }
                                );
                        },

                        /**
                         * Service function to update specified message in the database.
                         *
                         * @param   {number}            identifier  Message id number
                         * @param   {models.message}    data        Message data to update
                         *
                         * @returns {Promise|models.message}
                         */
                        'update': function updateRecord(identifier, data) {
                            return DataService
                                .update(endpoint, identifier, data)
                                .then(
                                    function(response) {
                                        handlers.updated({data: response.data, id: response.data.id});

                                        return response.data;
                                    }
                                );
                        },

                        /**
                         * Service function to delete specified message from database.
                         *
                         * @param   {number}    identifier  Message id number
                         *
                         * @returns {Promise|models.message}
                         */
                        'delete': function deleteRecord(identifier) {
                            return DataService
                                .delete(endpoint, identifier)
                                .then(
                                    function(response) {
                                        handlers.deleted({data: response.data, id: response.data.id});

                                        return response.data;
                                    }
                                );
                        }
                    };

                    return model;
                }
            ]
        );
}());
