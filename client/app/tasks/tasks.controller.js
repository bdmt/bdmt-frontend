'use strict';
(function(){

class TasksComponent {
  constructor($http, $location) {
    this.$http = $http;
    this.job = $location.search().job;
    this.tasks=[];
    this.data;
    
    // Chart information
    this.labels = ["January", "February", "March", "April", "May", "June", "July"];
    this.series = ['Series A', 'Series B'];
    this.chartData = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    
  }
  
  $onInit() {
    this.$http.get('/api/bdmt/jobs/'+this.job).then(response => {
      this.data = response.data;
      console.log(response.data);
    });
  }
  
  /*
  this.grabCpuInfo = grabCpuInfo;
  function grabCpuInfo() {
    
  }
  */
}

angular.module('bdmtRealApp')
  .component('tasks', {
    templateUrl: 'app/tasks/tasks.html',
    controller: TasksComponent
  });

})();
