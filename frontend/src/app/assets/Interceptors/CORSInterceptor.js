(function() {
    'use strict';

    angular.module('frontend')
        .factory('CORSInterceptor',
            [
                function() {
                    return {
                        request: function(config) {
                            return config;
                        }
                    };
                }
            ]
        );
}());