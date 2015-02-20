/**
 * Generic models angular module initialize. This module contains all 3rd party dependencies that application needs to
 * actually work.
 */
(function() {
  'use strict';

  angular.module('frontend.core.dependencies', [
    'angular-loading-bar',
    'ngSanitize',
    'ngBootbox',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.showErrors',
    'ui.utils',
    'angularMoment',
    'linkify',
    'toastr',
    'xeditable',
    'sails.io'
  ]);
}());
