/**
 * Simple service to return configuration for generic list. This service contains only
 * getter methods that all list views uses in Boilerplate frontend application.
 *
 * So generally you change these getter methods and changes are affected to all list
 * views on application.
 *
 * @todo text translations
 */
(function() {
    'use strict';

    angular.module('frontend.services')
        .factory('ListConfig',
            [
                '_',
                function(_) {
                    /**
                     * List title item configuration.
                     *
                     * @type {{
                     *      author: *[],
                     *      book: *[]
                     *  }}
                     */
                    var titleItems = {
                        author: [
                            {
                                title: 'Author',
                                column: 'name',
                                class: 'col-xs-11',
                                searchable: true,
                                sortable: true,
                                inSearch: true,
                                inTitle: true
                            },
                            {
                                title: 'Books',
                                column: false,
                                class: 'text-right col-xs-1',
                                searchable: false,
                                sortable: false,
                                inSearch: false,
                                inTitle: true
                            }
                        ],
                        book: [
                            {
                                title: 'Title',
                                column: 'title',
                                class: 'col-xs-8',
                                searchable: true,
                                sortable: true,
                                inSearch: true,
                                inTitle: true
                            },
                            {
                                title: 'Author',
                                column: false,
                                class: 'col-xs-3',
                                searchable: false,
                                sortable: false,
                                inSearch: false,
                                inTitle: true
                            },
                            {
                                title: 'Year',
                                column: 'releaseDate',
                                class: 'col-xs-1 text-right',
                                searchable: true,
                                sortable: true,
                                inSearch: true,
                                inTitle: true
                            }
                        ]
                    };

                    return {
                        /**
                         * Getter method for list default settings.
                         *
                         * @returns {{
                         *              itemCount:              Number,
                         *              items:                  Array,
                         *              itemsPerPage:           Number,
                         *              itemsPerPageOptions:    Array,
                         *              currentPage:            Number,
                         *              where:                  {},
                         *              loading:                Boolean,
                         *              loaded:                 Boolean
                         *          }}
                         */
                        getConfig: function getDefault() {
                            return {
                                itemCount: 0,
                                items: [],
                                itemsPerPage: 10,
                                itemsPerPageOptions: [10,25,50,100],
                                currentPage: 1,
                                where: {},
                                loading: true,
                                loaded: false
                            };
                        },

                        /**
                         * Getter method for lists title items. These are defined in the 'titleItems'
                         * variable.
                         *
                         * @param   {String}    model   Name of the model
                         *
                         * @returns {Array}
                         */
                        getTitleItems: function getTitleItem(model) {
                            return _.isUndefined(titleItems[model]) ? [] : titleItems[model];
                        }
                    };
                }
            ]
        );
}());
