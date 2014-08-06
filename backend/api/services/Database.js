'use strict';

/**
 * /api/services/Database.js
 *
 * Generic database service which will handle database initialize.
 */
var barrels = require('barrels');
var fixtures = barrels.load().objects;

/**
 * Database init service. This will populate database with specified fixture data. Fixtures
 * are located in '/backend/test/fixtures' directory.
 *
 * Also note that fixtures are not loaded if database contains any user data.
 *
 * @param   {Function}  next
 */
exports.init = function(next) {
    sails.log.verbose(__filename + ':' + __line + ' [Service.Database.init() called]');

    sails.models['user']
        .find()
        .exec(function(error, users) {
            if (error) {
                next(error);
            } else if (users.length != 0) {
                next();
            } else {
                barrels.populate(function(error) {
                    next(error);
                });
            }
        });
};
