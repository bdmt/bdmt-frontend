'use strict';

angular.module('bdmtRealApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/oldMain',
        template: '<main></main>'
      });
  });
