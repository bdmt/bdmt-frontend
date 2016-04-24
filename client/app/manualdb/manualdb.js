'use strict';

angular.module('bdmtRealApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('manualdb', {
        url: '/manualdb',
        template: '<manualdb></manualdb>'
      });
  });
