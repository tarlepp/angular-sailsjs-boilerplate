'use strict';

var _ = require('lodash');

/**
 * Policy to check that request is done via authenticated user. This policy uses existing
 * JWT tokens to validate that user is authenticated. If use is not authenticate policy
 * sends 401 response back to client.
 *
 * @param   {Request}   request     Request object
 * @param   {Response}  response    Response object
 * @param   {Function}  next        Callback function
 *
 * @returns {*}
 */
module.exports = function(request, response, next) {
    sails.log.verbose(__filename + ':' + __line + ' [Policy.Authenticated() called]');

    var token;

    // Yeah we got required 'authorization' header
    if (request.headers && request.headers.authorization) {
        var parts = request.headers.authorization.split(' ');

        if (parts.length == 2) {
            var scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            sails.log.verbose('     ERROR - Format is Authorization: Bearer [token]');

            return response.json(401, {message: 'Invalid authorization header format. Format is Authorization: Bearer [token]'});
        }
    } else if (request.param('token')) { // JWT token sent by parameter
        token = request.param('token');

        // We delete the token from query and body to not mess with blueprints
        request.query && delete request.query.token;
        request.body && delete request.body.token;
    } else { // Otherwise request didn't contain required JWT token
        sails.log.verbose('     ERROR - No Authorization header was found');

        return response.json(401, {message: 'No authorization header was found'});
    }

    // Verify JWT token via service
    sails.services['token'].verify(token, function(error, token) {
        if (_.isEmpty(error)) {
            sails.log.verbose('     OK');

            // Store user id to request object
            request.token = token;

            return next();
        } else {
            sails.log.verbose('     ERROR - The token is not valid');

            return response.json(401, {message: 'Given authorization token is not valid'});
        }
    });
};
