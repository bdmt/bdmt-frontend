'use strict';

angular.module('bdmtRealApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('jobs', {
        url: '/jobs',
        template: '<jobs></jobs>'
      });
  });
