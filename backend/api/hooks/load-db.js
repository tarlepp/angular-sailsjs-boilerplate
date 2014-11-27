'use strict';

/**
 * load-db.js
 *
 * This file contains a custom hook, that will be run after sails.js orm hook is loaded. Purpose of this hook is to
 * check that database contains necessary initial data for application.
 */
module.exports = function hook(sails) {
    return {
        /**
         * Private hook method to do actual database data population. Note that fixture data are only loaded if there
         * isn't any users in current database.
         *
         * @param   {Function}  next    Callback function to call after all is done
         */
        checkDatabase: function checkDatabase(next) {
            sails.models['user']
                .find()
                .exec(function onExec(error, users) {
                    if (error) {
                        next(error);
                    } else if (users.length !== 0) {
                        next();
                    } else {
                        sails.log.verbose(__filename + ':' + __line + ' [Hook.load-db] Populating database with fixture data...');

                        var _ = require('lodash');
                        var Barrels = require('barrels');
                        var barrels = new Barrels();
                        var fixtures = _.keys(barrels.data);

                        // Do actual database population
                        barrels.populate(fixtures, next, false);
                    }
                });
        },

        /**
         * Method that runs automatically when the hook initializes itself.
         *
         * @param   {Function}  next    Callback function to call after all is done
         */
        initialize: function initialize(next) {
            var hook = this;

            // Wait for sails orm hook to be loaded
            sails.after('hook:orm:loaded', function onAfter() {
                hook.checkDatabase(next);
            });
        }
    }
};
