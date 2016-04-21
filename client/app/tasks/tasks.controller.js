'use strict';
(function(){

class TasksComponent {
  constructor($http, $location) {
    this.$http = $http;
    this.job = $location.search().job
    this.tasks=[];
    this.data;
  }

  $onInit() {
    this.$http.get('/api/bdmt/jobs/'+this.job).then(response => {
      this.data = response.data;
      console.log(response.data);
    });
  }
}

angular.module('bdmtRealApp')
  .component('tasks', {
    templateUrl: 'app/tasks/tasks.html',
    controller: TasksComponent
  });

})();
