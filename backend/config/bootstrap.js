'use strict';

/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
module.exports.bootstrap = function(next) {
    /**
     * It's very important to trigger this 'next' method when you are finished with the bootstrap!
     * (otherwise your server will never lift, since it's waiting on the bootstrap)
     */
    sails.services.passport.loadStrategies();

    // This will catch all socket requests that are made and logs those to database.
    sails.on('router:request', function(request) {
        sails.services['logger'].request(request);
    });

    next();

};
