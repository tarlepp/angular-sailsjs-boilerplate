(function() {
    'use strict';

    angular.module('frontend')
        .factory('AuthService',
            [
                '$http', 'Session',
                function($http, Session) {
                    return {
                        login: function (credentials) {
                            return $http
                                .post('http://10.1.1.177:1337/login', credentials, {withCredentials: true})
                                .then(
                                    function(response) {
                                        console.log(response);
                                        Session.create(response.data.id, response.userid, response.role);
                                    }
                                );
                        },

                        isAuthenticated: function() {
                            return !!Session.id;
                        },

                        isAuthorized: function (authorizedRoles) {
                            if (!angular.isArray(authorizedRoles)) {
                                authorizedRoles = [authorizedRoles];
                            }

                            return (this.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
                        }
                    };
                }
            ]
        );
}());
