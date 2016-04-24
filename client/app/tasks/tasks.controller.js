'use strict';
(function(){

class TasksComponent {
  constructor($http, $location, $scope, $timeout) {
    this.$http = $http;
    this.$location = $location;
    this.$timeout = $timeout;

    this.job = $location.search().job;
    this.tasks=[];
    this.data;
    this.jobData;

    this.pageTitle = "CPU Viewer";
    this.raw_db_info;

    // Chart information
    this.labels = ["11:49:25", "", "11:49:35", "", "11:49:45", "", "11:49:55", "", "11:50:05", "", "11:50:05"];
    this.series = ['ip-172-31-15-148.ec2.internal', 'ip-172-31-58-62.ec2.internal'];
    this.chartData = [
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ];
    
    this.chartOptions = {
      scaleOverride: true,
      scaleSteps: 10,
      scaleStepWidth: 10,
      scaleStartValue: 0
    }

    this.tasks = [
      {
        id: 1,
        task_id: "0001",
        host: 1,
        start: 0,
        visible: false,
        values: [5, 14, 35, 47, 28, 3]
      }, {
        id: 2,
        task_id: "0002",
        host: 1,
        start: 6,
        visible: false,
        values: [14, 35, 29, 17, 5]
      },
      {
        id: 3,
        task_id: "0001",
        host: 2,
        start: 0,
        visible: false,
        values: [12, 23, 29, 39, 20, 14, 5]
      }
    ]

    //this.initGraph(this.tasks);

  }

  $onInit() {
    // Get the task info from the database
    if(!this.job) return;

    this.grabTaskInfo().then(response => {
      this.jobData = response.data;
    }).then(() => {
      return this.grabAllCPUInfo(this.jobData);
    }).then(response => {
      console.log("Response with data: ", response);
    });
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

    //(this.makeNVisible(3, 2000))();
    //this.toggleTask(1);
    //this.toggleTask(2);
    //this.toggleTask(3);
    /*
    setTimeout((() => {
      this.toggleTask(1);
    }), 1000);

    setTimeout((() => {
      this.toggleTask(2);
    }), 2500);

    setTimeout((() => {
      this.toggleTask(3);
    }), 4000);

    */
    
    //(this.makeNVisible(3, 2000))();
    this.$timeout(this.makeNVisible(this.tasks.length,1000), 1000);
    
    //$timeout(, 1000);
    
    //console.log(this);

    // function that returns function
    // if n == 0, function just prints
    // otherwise, function will print, then make another recursive call to itself.

  }
  
  // Grab task info from server
  grabTaskInfo() {
    return this.$http.get('/api/bdmt/jobs/' + this.job);
  }
  
  // Grab every (timestamp, value) key-value pair in the database
  // given the relevant job and host id.
  grabAllCPUInfo(jobinfo) {
    //return this.$http.get('/api/bdmt/')
    console.log("Grabbing our job information...");
    return this.$http.get('/api/bdmt/metric/cpu', {
      params: {"app": jobinfo.job.id}
    });
  }

  initGraph(taskdata) {
    var finalChartData = [];
    var maxLength = 0;

    // Grab the maximum length from the table
    for(var i in taskdata) {
      if(taskdata[i].start + taskdata[i].values.length > maxLength)
        maxLength = taskdata[i].start + taskdata[i].values.length;
    }

    // Throw in that many zeros to initialize the graph
    for(var i in taskdata) {
      if(finalChartData[taskdata[i].host-1] != undefined) continue;

      finalChartData[taskdata[i].host-1] = [];
      for(var j=0; j < maxLength; j++)
        finalChartData[taskdata[i].host-1].push(0);
    }

    console.log("New chart data: ", finalChartData, maxLength);

    this.chartData = finalChartData;

  }

  taskClick(tid, val) {
    console.log("Clicked task ", tid);
    console.log("Task info: ", val);
    if(val) {
      this.makeTaskVisible(tid);
    } else {
      this.makeTaskInvisible(tid);
    }
  }
  
  makeTaskVisible(t) {

    // Copy the values from the task's info into the graph
    var task = this.tasks[t-1];

    for(var i = 0; i < task.values.length; i++) {
      //console.log("Changing ", this.chartData[task.host-1][task.start+i], " to ", task.values[i]);
      this.chartData[task.host-1][task.start+i] = task.values[i];
    }

    task.visible = true;
  }
  
  makeTaskInvisible(t) {
    var task = this.tasks[t-1];

    for(var i = 0; i < task.values.length; i++) {
      this.chartData[task.host-1][task.start+i] = 0;
    }

    task.visible = false;
  }
  
  makeNVisible(n, time) {
    if(n == 0) return (() => {
      return;
    });

    return (() => {
      this.makeTaskVisible(n);
      this.$timeout(this.makeNVisible(n-1, time), time);
    });
  }
  
  
}

angular.module('bdmtRealApp')
  .component('tasks', {
    templateUrl: 'app/tasks/tasks.html',
    controller: TasksComponent
  });

})();
