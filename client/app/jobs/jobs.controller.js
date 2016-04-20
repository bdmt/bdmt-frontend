'use strict';
(function() {
  console.log('HEEY?');
  class JobsComponent {
    constructor($http) {
      this.$http= $http;
      console.log('heeeey');
      this.message = 'Hello2';
    }

    $onInit() {

      this.$http.get('/api/bdmt/jobs').then(response => {
        this.message = response.data;
      });
    }
  }

  angular.module('bdmtRealApp')
    .component('jobs', {
      templateUrl: 'app/jobs/jobs.html',
      controller: JobsComponent
    });

})();
