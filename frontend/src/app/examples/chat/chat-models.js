/**
 * This file contains all necessary Angular model definitions for 'frontend.examples.chat' module.
 *
 * Note that this file should only contain models and nothing else. Also note that these "models" are just basically
 * services that wraps all things together.
 */
(function() {
    'use strict';

    /**
     * Model for Message API, this is used to wrap all Message objects specified actions and data change actions.
     */
    angular.module('frontend.examples.chat')
        .factory('MessageModel',
            [
                'ModelFactory',
                function MessageModel(ModelFactory) {
                    // Endpoint definition for model
                    var endpoint = 'message';

                    // Get model
                    var model = angular.copy(ModelFactory);

                    // Initialize model
                    model.setEndpoint(endpoint);

                    // Custom handler for created objects
                    model.handlerCreated = function handlerCreated(message) {
                        model.objects.push(message.data);
                    };

                    return model;
                }
            ]
        );
}());
