'use strict';

angular.module('bdmtRealApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tasks', {
        url: '/tasks',
        template: '<tasks></tasks>'
      });
  });
