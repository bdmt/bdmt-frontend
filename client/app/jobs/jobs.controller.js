'use strict';
(function(){

class JobsComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('job')
  .component('jobs', {
    templateUrl: 'app/jobs/jobs.html',
    controller: JobsComponent
  });

})();
