'use strict';

angular.module('bdmtRealApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('load', {
        url: '/jobs/load',
        template: '<load></load>'
      });
  });
