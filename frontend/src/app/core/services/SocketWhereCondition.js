/**
 * Simple angular service to parse search filters for socket queries. Usage example:
 *
 *  $sailsSocket
 *      .get("/Book/", {
 *          params: {
 *              where: SocketWhereCondition.get($scope.filters)
 *          }
 *      })
 *      .then(
 *          function successCb(response) {
 *              // Do your data handling here
 *          }
 *          function errorCb(response) {
 *              // Do your error handling here
 *          }
 *      );
 *
 * @todo add more complex parameter handling
 */
(function() {
    'use strict';

    angular.module('frontend.core.services')
        .factory('SocketWhereCondition',
            [
                '_',
                function(_) {
                    return {
                        get: function(filters, defaults) {
                            var output = defaults || {};

                            // Determine search columns
                            var columns = _.filter(filters.columns, function filterColumn(column) {
                                return column.inSearch;
                            });

                            // Determine search words
                            var words = _.filter(filters.searchWord.split(' '));

                            // We have some search word(s) and column(s)
                            if (columns.length > 0 && words.length > 0) {
                                var conditions = [];

                                // Iterate each columns
                                _.each(columns, function iteratorColumns(column) {
                                    // Iterate each search word
                                    _.each(words, function iteratorWords(word) {
                                        var condition = {};

                                        // Create actual condition and push that to main condition
                                        condition[column.column] = {contains: word};

                                        conditions.push(condition);
                                    });
                                });

                                output = {or: conditions};
                            }

                            return output;
                        }
                    };
                }
            ]
        );
}());