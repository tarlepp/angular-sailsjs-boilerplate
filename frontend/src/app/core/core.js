/**
 * Angular module for 'core' component. This component is divided to following logical components:
 *
 *  frontend.core.components
 *  frontend.core.directives
 *  frontend.core.error
 *  frontend.core.filters
 *  frontend.core.interceptors
 *  frontend.core.layout
 *  frontend.core.libraries
 *  frontend.core.models
 *  frontend.core.services
 *
 * Each component has it own configuration for ui-router.
 */
(function() {
    'use strict';

    // Define frontend.core module
    angular.module('frontend.core', [
        'frontend.core.components',
        'frontend.core.directives',
        'frontend.core.error',
        'frontend.core.filters',
        'frontend.core.interceptors',
        'frontend.core.layout',
        'frontend.core.libraries',
        'frontend.core.models',
        'frontend.core.services'
    ]);
}());
