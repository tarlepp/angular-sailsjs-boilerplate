/**
 * This file contains generic model factory that will return a specified model instance for desired endpoint with
 * given event handlers. Basically all of this boilerplate application individual models are using this service to
 * generate real model.
 *
 * @todo
 *  1) add usage examples
 *  2) more documentation
 */
(function() {
    'use strict';

    angular.module('frontend.models')
        .factory('ModelFactory',
            [
                '$sailsSocket',
                '_',
                'DataService',
                function (
                    $sailsSocket,
                    _,
                    DataService
                ) {
                    var model = this;

                    /**
                     * Single object for current endpoint, this is populated automatic with 'fetch' function.
                     *
                     * @type {{}}
                     */
                    model.object = {};

                    /**
                     * Array of loaded objects for current endpoint, this is populated with 'load' function.
                     *
                     * @type {Array}
                     */
                    model.objects = [];

                    /**
                     * Current model instance endpoint. This can be set via 'setEndpoint' service function.
                     *
                     * @type {string}
                     */
                    model.endpoint = '';

                    /**
                     * Service function to set used model endpoint. Note that this will also trigger subscribe for
                     * this endpoint actions (created, updated, deleted, etc.).
                     *
                     * @param   {string}    endpoint    Model endpoint definition
                     */
                    model.setEndpoint = function setEndpoint(endpoint) {
                        var self = this;

                        // Set used endpoint
                        self.endpoint = endpoint;

                        // Subscribe to specified endpoint
                        self._subscribe();
                    };

                    /**
                     * Service function to subscribe model socket events. This is needed to update model data according
                     * to another users updates (create, update, delete, etc.) within this model. Basically this will
                     * just trigger one of following service function calls:
                     *
                     *  - handlerCreated
                     *  - handlerUpdated
                     *  - handlerDeleted
                     *
                     * @private
                     */
                    model._subscribe = function subscribe() {
                        var self = this;

                        // Actual subscribe
                        $sailsSocket
                            .subscribe(self.endpoint, function modelEvent(message) {
                                // Handle this event
                                self._handleEvent(message);
                            });
                    };

                    /**
                     * Generic event handler for model events (created, updated, deleted, etc.). This function is 
                     * called from model socket events and 'create', 'update' and 'delete' service function.
                     *
                     * @param   {{
                     *              verb:   String,
                     *              data:   {},
                     *              id:     Number
                     *          }}  message Message to handle
                     *
                     * @private
                     */
                    model._handleEvent = function handleEvent(message) {
                        var self = this;
                        var method = 'handler' + message.verb[0].toUpperCase() + message.verb.slice(1);

                        if (_.isFunction(self[method])) {
                            self[method](message);
                        } else {
                            console.log('Implement handling for \'' + message.verb + '\' socket messages');
                        }
                    };

                    /**
                     * Default behaviour for created objects for specified endpoint. If you need some custom logic
                     * for your model, just overwrite this function on your model.
                     *
                     * @param   {{
                     *              verb:   String,
                     *              data:   {},
                     *              id:     Number
                     *          }}  message
                     */
                    model.handlerCreated = function handlerCreated(message) {
                        var self = this;

                        console.log('Object created', self.endpoint, message);
                    };

                    /**
                     * Default behaviour for updated objects for specified endpoint. If you need some custom logic
                     * for your model, just overwrite this function on your model.
                     *
                     * @param   {{
                     *              verb:   String,
                     *              data:   {},
                     *              id:     Number
                     *          }}  message
                     */
                    model.handlerUpdated = function handlerUpdated(message) {
                        var self = this;

                        console.log('Object updated', self.endpoint, message);
                    };

                    /**
                     * Default behaviour for deleted objects for specified endpoint. If you need some custom logic
                     * for your model, just overwrite this function on your model.
                     *
                     * @param   {{
                     *              verb:   String,
                     *              data:   {},
                     *              id:     Number
                     *          }}  message
                     */
                    model.handlerDeleted = function handlerDeleted(message) {
                        var self = this;

                        console.log('Object deleted', self.endpoint, message);
                    };

                    /**
                     * Service function to return count of objects with specified parameters.
                     *
                     * @param   {{}}    [parameters]    Query parameters
                     *
                     * @returns {Promise|models.count}
                     */
                    model.count = function count(parameters) {
                        var self = this;

                        return DataService
                            .count(self.endpoint, parameters)
                            .then(
                                function successCallback(response) {
                                    return response.data;
                                }
                            );
                    };

                    /**
                     * Service function to load objects from specified endpoint with given parameters. Note that this
                     * function will also store those objects to current service instance.
                     *
                     * @param   {{}}    [parameters]    Query parameters
                     *
                     * @returns {Promise|*}
                     */
                    model.load = function loadObjects(parameters) {
                        var self = this;

                        return DataService
                            .collection(self.endpoint, parameters)
                            .then(
                                function successCallback(response) {
                                    self.objects = response.data;

                                    return self.objects;
                                }
                            );
                    };

                    /**
                     * Service function to load single object from specified endpoint with given parameters. Note that
                     * this will also store fetched object to current instance of this service.
                     *
                     * @param   {Number}    identifier      Object identifier
                     * @param   {{}}        [parameters]    Query parameters
                     *
                     * @returns {Promise|*}
                     */
                    model.fetch = function fetchObject(identifier, parameters) {
                        var self = this;

                        return DataService
                            .fetch(self.endpoint, identifier, parameters)
                            .then(
                                function (response) {
                                    self.object = response.data;

                                    return self.object;
                                }
                            );
                    };

                    /**
                     * Service function to create new object to current model endpoint. Note that this will also
                     * trigger 'handleMessage' service function, which will handle all necessary updates to current
                     * service instance.
                     *
                     * @param   {{}}    data    Object data to create
                     *
                     * @returns {Promise|*}
                     */
                    model.create = function createObject(data) {
                        var self = this;

                        return DataService
                            .create(self.endpoint, data)
                            .then(
                                function(response) {
                                    self._handleEvent({verb: 'created', data: response.data, id: response.data.id});

                                    return response.data;
                                }
                            );
                    };

                    /**
                     * Service function to update specified object in current model endpoint. Note that this will also
                     * trigger 'handleMessage' service function, which will handle all necessary updates to current
                     * service instance.
                     *
                     * @param   {Number}    identifier  Object identifier
                     * @param   {{}}        data        Object data to update
                     *
                     * @returns {Promise|*}
                     */
                    model.update = function updateObject(identifier, data) {
                        var self = this;

                        return DataService
                            .update(self.endpoint, identifier, data)
                            .then(
                                function(response) {
                                    self._handleEvent({verb: 'updated', data: response.data, id: response.data.id});

                                    return response.data;
                                }
                            );
                    };

                    /**
                     * Service function to delete specified object from current model endpoint. Note that this will
                     * also trigger 'handleMessage' service function, which will handle all necessary updates to
                     * current service instance.
                     *
                     * @param   {Number}    identifier  Object identifier
                     *
                     * @returns {Promise|*}
                     */
                    model.delete = function deleteObject(identifier) {
                        var self = this;

                        return DataService
                            .delete(self.endpoint, identifier)
                            .then(
                                function(response) {
                                    self._handleEvent({verb: 'deleted', data: response.data, id: response.data.id});

                                    return response.data;
                                }
                            );
                    };

                    return model;
                }
            ]
        );
}());
