/**
 * This file contains all necessary Angular service definitions for 'frontend.example.navigation' module.
 *
 * Note that this file should only contain services and nothing else.
 */
(function() {
    'use strict';

    /**
     * Generic info modal service, that contains necessary functionality to configure and open specified info modal.
     * These info modals are just for generic documentation for each GUI that is implemented to application.
     */
    angular.module('frontend.example.navigation')
        .factory('NavigationInfoModalService',
            [
                '$modal',
                function NavigationInfoModalService($modal) {
                    var service = {
                        /**
                         * Current title, directory and template values that are used on service.open() function.
                         *
                         * @private
                         */
                        '_title': '',
                        '_directory': '',
                        '_template': '',

                        /**
                         * Setter method for title and section.
                         *
                         * @param   {String}    title       Title of the modal
                         * @param   {String}    directory   Directory where to find info template
                         * @param   {String}    template    Template prefix to use
                         */
                        'set': function set(title, directory, template) {
                            service._title = title;
                            service._directory = directory;
                            service._template = template;
                        },

                        /**
                         * Service function to open specified information modal of specified GUI in boilerplate
                         * application.
                         */
                        'open': function open() {
                            $modal.open({
                                templateUrl: '/frontend/navigation/help.html',
                                controller: 'NavigationModalController',
                                size: 'lg',
                                resolve: {
                                    '_title': function resolveTitle() {
                                        return service._title;
                                    },
                                    '_directory': function resolveDirectory() {
                                        return service._directory;
                                    },
                                    '_template': function resolveTemplate() {
                                        return service._template;
                                    }
                                }
                            });
                        }
                    };

                    return service;
                }
            ]
        );
}());
