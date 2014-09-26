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
                     * @type {{book: *[]}}
                     */
                    var titleItems = {
                        author: [
                            {title: 'Author', column: 'name'},
                            {title: 'Books', column: false, class: 'text-right'}
                        ],
                        book: [
                            {title: 'Title', column: 'title'},
                            {title: 'Author', column: false},
                            {title: 'Year', column: 'releaseDate', 'class': 'text-right'}
                        ]
                    };

                    return {
                        /**
                         * Getter method for list default settings.
                         *
                         * @returns {{
                         *              itemCount:      number,
                         *              items:          Array,
                         *              itemsPerPage:   number,
                         *              currentPage:    number,
                         *              where:          {},
                         *              loading:        boolean,
                         *              loaded:         boolean
                         *          }}
                         */
                        getConfig: function getDefault() {
                            return {
                                itemCount: 0,
                                items: [],
                                itemsPerPage: 10,
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
