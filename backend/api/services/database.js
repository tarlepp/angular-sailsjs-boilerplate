'use strict';

var barrels = require('barrels');
var fixtures = barrels.load().objects;

exports.init = function(next) {
    User
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