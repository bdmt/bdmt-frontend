'use strict';

angular.module('job')
  .config(function ($stateProvider) {
    $stateProvider
      .state('jobs', {
        url: '/jobs',
        template: '<jobs></jobs>'
      });
  });