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
 *  1) \config\bootstrap.js = logs socket requests
 *  2) \config\http.js      = logs http requests
 *
 * Note that this method is called "silently" and if error occurs those are  just added to sails error log. Also note
 * that this also needs to determine user id from authentication token (JWT) within some cases.
 *
 * @todo    Make clean of this collection, because this will be a huge one :D
 *
 * @param   {Request}   request Request object
 */
exports.request = function request(request) {
    sails.log.verbose(__filename + ':' + __line + ' [Service.Logger.request() called]');

    var userId;

    // Token is found on request object (this means that it has been already verified)
    if (request.token) {
        userId = request.token;
    } else { // Otherwise we need to determine token for log data
        sails.services['token'].getToken(request, function verify(error, token) {
            if (_.isEmpty(error) && token !== -1) {
                userId = token;
            } else {
                userId = -1;
            }
        }, false);
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
            user:       userId
        })
        .exec(function exec(error) {
            if (error) {
                sails.log.error(__filename + ':' + __line + ' [Failed to write request data to database]');
                sails.log.error(error);
            }
        });
};
