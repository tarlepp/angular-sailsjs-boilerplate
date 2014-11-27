'use strict';

var _ = require('lodash');

/**
 * Generic logger service which Taskboard backend uses. Currently this service contains
 * following methods:
 *
 *  login(user, request)
 *  request(request)
 *
 * You can find detailed information about these below.
 */

/**
 * Service method to add user login information to database. Note that this is called
 * only from AuthController after successfully user login action.
 *
 * @param   {sails.model.user}  user        User object
 * @param   {Request}           request     Request object
 */
exports.login = function login(user, request) {
    sails.log.verbose(__filename + ':' + __line + ' [Service.Logger.login() called]');

    // Parse detailed information from user-agent string
    var r = require('ua-parser').parse(request.headers['user-agent']);

    // Create new UserLogin row to database
    sails.models['userlogin']
        .create({
            ip:             request.ip,
            host:           request.host,
            agent:          request.headers['user-agent'],
            browser:        (r.ua.toString() || 'Unknown'),
            browserVersion: (r.ua.toVersionString() || 'Unknown'),
            browserFamily:  (r.ua.family || 'Unknown'),
            os:             (r.os.toString() || 'Unknown'),
            osVersion:      (r.os.toVersionString() || 'Unknown'),
            osFamily:       (r.os.family || 'Unknown'),
            user:           user.id
        })
        .exec(function(error) {
            if (error) {
                sails.log.error(__filename + ':' + __line + ' [Failed to write user login data to database]');
                sails.log.error(error);
            }
        });
};

/**
 * Service method to create request log. This is fired from two places:
 *
 *  1)  \config\bootstrap.js    = logs socket requests
 *  2)  \config\http.js         = logs http requests
 *
 * Note that this method is called "silently" and if error occurs those are
 * just added to sails error log.
 *
 * @todo    Make clean of this collection, because this will be a huge one :D
 *
 * @param   {Request}   request Request object
 */
exports.request = function request(request) {
    sails.log.verbose(__filename + ':' + __line + ' [Service.Logger.request() called]');

    // Initialize user id value
    var user = request.token || -1;

    // Request object doesn't contain token yet, so we need to figure that out
    if (!request.token) {
        var token = '';

        if (request.headers && request.headers.authorization) {
            var parts = request.headers.authorization.split(' ');

            if (parts.length == 2) {
                var scheme = parts[0],
                    credentials = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
                }
            }
        } else if (request.param('token')) { // JWT token sent by parameter
            token = request.param('token');
        }

        // Yeah we have a token
        if (token.length > 0) {
            // Validate token
            sails.services['token'].verify(token, function(error, token) {
                if (_.isEmpty(error)) {
                    user = token;
                }
            });
        }
    }

    // Create new log entry
    sails.models['requestlog']
        .create({
            method:     request.method,
            url:        request.url,
            headers:    request.headers || {},
            parameters: request.params || {},
            query:      request.query || {},
            body:       request.body || {},
            protocol:   request.protocol,
            ip:         request.ip,
            user:       user
        })
        .exec(function(error) {
            if (error) {
                sails.log.error(__filename + ':' + __line + ' [Failed to write request data to database]');
                sails.log.error(error);
            }
        });
};
