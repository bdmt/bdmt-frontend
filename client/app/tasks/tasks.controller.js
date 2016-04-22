'use strict';
(function(){

class TasksComponent {
  constructor($http, $location, $scope) {
    var tc = this;
    this.$http = $http;
    this.job = $location.search().job;
    this.tasks=[];
    this.data;
    tc.tasksSelected= [];
    // Chart information
    this.labels = ["January", "February", "March", "April", "May", "June", "July"];
    this.series = ['Series A', 'Series B'];
    this.chartData = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];


    this.arraySorter = arraySorter;
    function arraySorter(){

      setTimeout(function(){ tc.tasksSelected.sort(); }, 700);


    }
  }

  $onInit() {
    this.$http.get('/api/bdmt/jobs/'+this.job).then(response => {
      this.data = response.data.tasks;
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
