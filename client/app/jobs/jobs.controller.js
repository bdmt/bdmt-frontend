'use strict';
(function() {
  class JobsComponent {
    constructor($http) {
      this.$http= $http;
      this.jobs= [];
      this.selectedJobs = [];
    }

    $onInit() {
      this.$http.get('/api/bdmt/jobs').then(response => {
        this.jobs = response.data;
      });
    }
  }

  angular.module('bdmtRealApp')
    .component('jobs', {
      templateUrl: 'app/jobs/jobs.html',
      controller: JobsComponent
    });

})();
