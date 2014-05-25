'use strict';

/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var AuthController = {
    /**
     * Log out a user and return them to the homepage
     *
     * Passport exposes a logout() function on request (also aliased as logOut()) that
     * can be called from any route handler which needs to terminate a login
     * session. Invoking logout() will remove the request.user property and clear the
     * login session (if any).
     *
     * For more information on logging out users in Passport.js, check out:
     * http://passportjs.org/guide/logout/
     *
     * @param   {Object}    request
     * @param   {Object}    response
     */
    logout: function(request, response) {
        request.logout();

        response.json(200);
    },

    /**
     * Create a third-party authentication endpoint
     *
     * @param   {Object}    request
     * @param   {Object}    response
     */
    provider: function(request, response) {
        passport.endpoint(request, response);
    },

    /**
     * Create a authentication callback endpoint
     *
     * This endpoint handles everything related to creating and verifying Passports
     * and users, both locally and from third-party providers.
     *
     * Passport exposes a login() function on request (also aliased as logIn()) that
     * can be used to establish a login session. When the login operation completes,
     * user will be assigned to request.user.
     *
     * For more information on logging in users in Passport.js, check out:
     * http://passportjs.org/guide/login/
     *
     * @param   {Object}    request
     * @param   {Object}    response
     */
    callback: function (request, response) {
        passport.callback(request, response, function(error, user) {
            request.login(user, function(error) {
                // If an error was thrown, redirect the user to the login which should
                // take care of rendering the error messages.
                if (error) {
                    response.json(401, error);
                } else { // Upon successful login, send the user to the homepage were request.user will available.
                    response.json(200, user);
                }
            });
        });
    }
};

module.exports = AuthController;
