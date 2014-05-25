(function() {
    'use strict';

    angular.module('frontend')
        .service('Session', function() {
            this.create = function(sessionId, userId, userRole) {
                this.id = sessionId;
                this.userId = userId;
                this.userRole = userRole;
            };

            this.destroy = function() {
                this.id = null;
                this.userId = null;
                this.userRole = null;
            };

            return this;
        });
}());