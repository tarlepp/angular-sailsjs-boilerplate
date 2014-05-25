'use strict';

module.exports = function(request, response, next) {
    if (!request.isAuthenticated()) {
        next('Please sign-in first');
    } else {
        next();
    }
};
