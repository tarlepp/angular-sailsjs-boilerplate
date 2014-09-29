/**
 * This file contains all chat specified models that are used on chat example
 *
 * Note that this file should only contain models and nothing else.
 */
(function() {
    'use strict';

    /**
     * Model for Book API, this is used to wrap all Book objects specified actions and
     * data change actions.
     *
     * @todo about 99% of this code is same for all models, figure out to avoid this
     */
    angular.module('frontend.example.book')
        .factory('BookModel',
            [
                '$sailsSocket',
                '_',
                'DataService',
                function($sailsSocket,
                         _,
                         DataService
                ) {
                    // We need to specify current model endpoint
                    var endpoint = 'book';

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
                     *              book: {},
                     *              books: Array,
                     *              count: Function,
                     *              load: Function,
                     *              fetch: Function,
                     *              create: Function,
                     *              update: Function,
                     *              delete: Function
                     *          }}
                     */
                    var model = {
                        'book': {},
                        'books': [],

                        /**
                         * Service function to return count of books with specified parameters.
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
                         * Service function to load book data from database and store those to current instance
                         * of service.
                         *
                         * @param   {{}}    [parameters]    Load parameters
                         *
                         * @returns {Promise|models.book[]}
                         */
                        'load': function load(parameters) {
                            return DataService
                                .collection(endpoint, parameters)
                                .then(
                                    function(response) {
                                        model.books = response.data;

                                        return model.books;
                                    }
                                );
                        },

                        /**
                         * Service function to load single book data from database and store it to current
                         * instance of service.
                         *
                         * @param   {number}    identifier      Book id number
                         * @param   {{}}        [parameters]    Load parameters
                         *
                         * @returns {Promise|models.book}
                         */
                        'fetch': function fetchRecords(identifier, parameters) {
                            return DataService
                                .fetch(endpoint, identifier, parameters)
                                .then(
                                    function (response) {
                                        model.book = response.data;

                                        return model.book;
                                    }
                                );
                        },

                        /**
                         * Service function to create new book to database.
                         *
                         * @param   {models.book}    data   Book data to create
                         *
                         * @returns {Promise|models.book}
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
                         * Service function to update specified book in the database.
                         *
                         * @param   {number}        identifier  Book id number
                         * @param   {models.book}   data        Book data to update
                         *
                         * @returns {Promise|models.book}
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
                         * Service function to delete specified book from database.
                         *
                         * @param   {number}    identifier  Book id number
                         *
                         * @returns {Promise|models.book}
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
