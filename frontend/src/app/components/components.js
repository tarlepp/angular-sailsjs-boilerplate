/**
 * Angular module for 'components' component. This component is divided to following logical components:
 *
 *  frontend.examples.author
 *  frontend.examples.book
 *  frontend.examples.chat
 *  frontend.examples.messages
 *
 * Each component has it own configuration for ui-router.
 */
(function() {
    'use strict';

    // Define frontend.components module
    angular.module('frontend.components', [
        'frontend.components.bundles',
        'frontend.components.directives',
        'frontend.components.filters',
        'frontend.components.interceptors',
        'frontend.components.libraries',
        'frontend.components.models',
        'frontend.components.services'
    ]);
}());
