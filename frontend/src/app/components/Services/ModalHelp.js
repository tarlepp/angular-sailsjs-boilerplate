/**
 * Generic modal helper service that will open GUI specified help modal, that contains
 * detailed information about current GUI on boilerplate.
 */
(function() {
    'use strict';

    angular.module('frontend.services')
        .factory('ModalHelp',
            [
                '$modal',
                function ModalHelp($modal) {
                    var service = {
                        // Current title and section string store
                        'title': '',
                        'section': '',
                        'subSection': '',

                        /**
                         * Setter method for title and section.
                         *
                         * @param   {String}    title           Title of the modal
                         * @param   {String}    section         Modal 'section' which to show
                         * @param   {String}    [subSection]    Modal 'subSection' which to show
                         */
                        'set': function set(title, section, subSection) {
                            service.title = title;
                            service.section = section;
                            service.subSection = subSection;
                        },

                        /**
                         * Service function to open actual information modal of specified
                         * GUI in boilerplate application.
                         */
                        'open': function open() {
                            $modal.open({
                                templateUrl: '/frontend/info/help.html',
                                controller: 'InfoController',
                                size: 'lg',
                                resolve: {
                                    '_title': function resolveTitle() {
                                        return service.title;
                                    },
                                    '_section': function resolveSection() {
                                        return service.section;
                                    },
                                    '_subSection': function resolveSubSection() {
                                        return service.subSection;
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
