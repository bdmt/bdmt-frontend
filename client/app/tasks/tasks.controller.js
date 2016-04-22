'use strict';
(function(){

class TasksComponent {
  constructor($http, $location) {
    this.$http = $http;
    this.job = $location.search().job;
    this.tasks=[];
    this.jobData;
    
    this.pageTitle = "CPU Viewer";
    this.raw_db_info;
    
    // Chart information
    this.labels = ["11:49:25", "", "11:49:35", "", "11:49:45", "", "11:49:55", "", "11:50:05", "", "11:50:05"];
    this.series = ['ip-172-31-15-148.ec2.internal', 'ip-172-31-58-62.ec2.internal'];
    this.chartData = [
      [ 5, 14, 35, 47, 28,  3, 14, 35, 29, 17,  5],
      [12, 23, 29, 39, 20, 14, 5,  0,  0,  0,  0]
    ];
    
    this.tasks = [
      {
        host: 0,
        start: 0,
        values: [5, 14, 35, 47, 28, 3]
      }, {
        host: 0,
        start: 6,
        values: [14, 35, 29, 17, 5]
      },
      {
        host: 0,
        start: 0,
        values: [12, 23, 29, 39, 20, 14, 5]
      }
    ]
    
    this.initGraph(this.tasks);
    
  }
  
  $onInit() {
    
    // Get the task info from the database
    this.grabTaskInfo().then(response => {
      this.jobData = response.data;
    })
    /*
    .then(grabAllCPUInfo(this.jobData.job.id))
    
    .then(() => {
      
      // Key: host_id
      // Value: array of that host's (timestamp, value) pairs
      cpu_master = {};
      
      if(!this.jobData.job.id) return;
      if(!this.jobData.tasks) return;
      
      this.raw_db_info = grabAllCPUInfo(this.jobData.job.id);
    });*/
    
  }
  
  // Grab task info from server
  grabTaskInfo() {
    return this.$http.get('/api/bdmt/jobs/'+this.job);
  }
  
  initGraph(taskData) {
    var finalChartData = [];
    var maxLength = 0;
    
    // Grab the maximum length from the table
    for(i in taskdata) {
      maxLength = Math.max(taskdata[i].start + taskdata[i].length, maxLength);
    }
    
    // Throw in that many zeros to initialize the graph
    for(i in taskdata) {
      if(finalChartData[taskdata[i].host]) continue;
      
      finalChartData[taskdata[i].host] = [];
      for(var j=0; j < maxLength; j++)
        finalChartData[taskdata[i].host].push(0);
    }
    
  }
  
  
  // Grab every (timestamp, value) key-value pair in the database
  // given the relevant job and host id.
  /*grabAllCPUInfo(jobid) {
    return this.$http.get('/api/bdmt/')
    
  }*/
  
}

angular.module('bdmtRealApp')
  .component('tasks', {
    templateUrl: 'app/tasks/tasks.html',
    controller: TasksComponent
  });

})();
