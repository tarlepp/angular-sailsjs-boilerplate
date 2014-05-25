'use strict';

var validator = require('validator');

/**
 * Local Authentication Protocol
 *
 * The most widely used way for websites to authenticate users is via a username
 * and/or email as well as a password. This module provides functions both for
 * registering entirely new users, assigning passwords to already registered
 * users and validating login requesting.
 *
 * For more information on local authentication in Passport.js, check out:
 * http://passportjs.org/guide/username-password/
 */

/**
 * Assign local Passport to user
 *
 * This function can be used to assign a local Passport to a user who doens't
 * have one already. This would be the case if the user registered using a
 * third-party service and therefore never set a password.
 *
 * @param   {Object}   request
 * @param   {Object}   response
 * @param   {Function} next
 */
exports.connect = function(request, response, next) {
    var user = request.user;
    var password = request.param('password');

    Passport.findOne({
        protocol: 'local',
        user: user.id
    }, function(error, passport) {
        if (error) {
            next(error);
        } else {
            if (!passport) {
                Passport
                    .create({
                        protocol: 'local',
                        password: password,
                        user: user.id
                    }, function (err, passport) {
                        next(err, user);
                    });
            } else {
                next(null, user);
            }
        }
    });
};

/**
 * Validate a login request
 *
 * Looks up a user using the supplied identifier (email or username) and then
 * attempts to find a local Passport associated with the user. If a Passport is
 * found, its password is checked against the password supplied in the form.
 *
 * @param   {Object}   request
 * @param   {string}   identifier
 * @param   {string}   password
 * @param   {Function} next
 */
exports.login = function(request, identifier, password, next) {
    var isEmail = validator.isEmail(identifier);
    var query = {};

    if (isEmail) {
        query.email = identifier;
    } else {
        query.username = identifier;
    }

    User.findOne(query, function(error, user) {
        if (error) {
            next(error);
        } else if (!user) {
            if (isEmail) {
                request.flash('error', 'Error.Passport.Email.NotFound');
            } else {
                request.flash('error', 'Error.Passport.Username.NotFound');
            }

            next(null, false);
        } else {
            Passport
                .findOne({
                    protocol: 'local',
                    user: user.id
                }, function(error, passport) {
                    if (passport) {
                        passport.validatePassword(password, function(error, response) {
                            if (error) {
                                next(error);
                            } else if (!response) {
                                request.flash('error', 'Error.Passport.Password.Wrong');

                                next(null, false);
                            } else {
                                next(null, user);
                            }
                        });
                    } else {
                        request.flash('error', 'Error.Passport.Password.NotSet');

                        next(null, false);
                    }
                });
        }
    });
};
