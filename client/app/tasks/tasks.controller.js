'use strict';
(function(){

class TasksComponent {
  constructor($http, $location, $scope, $timeout) {
    this.$http = $http;
    this.$location = $location;
    this.$timeout = $timeout;

    this.job = $location.search().job;
    this.tasks= [];
    this.data;
    this.jobData;

    this.pageTitle = "CPU Viewer";
    this.VISIBLE_ON_INIT = false;
    this.raw_db_info;

    // Chart information
    this.labels = [];
    //this.series = ['ip-172-31-15-148.ec2.internal', 'ip-172-31-58-62.ec2.internal'];
    this.chartData = [];

    //this.labels = ["11:49:25", "", "11:49:35", "", "11:49:45", "", "11:49:55", "", "11:50:05", "", "11:50:05"];
    //
    /*this.chartData = [
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ];*/

    this.chartOptions = {
      scaleOverride: true,
      scaleSteps: 10,
      scaleStepWidth: 10,
      scaleStartValue: 0
    }

    // this.tasks = [
    //   {
    //     id: 1,
    //     task_id: "0001",
    //     host: 1,
    //     start: 0,
    //     visible: false,
    //     values: [5, 14, 35, 47, 28, 3]
    //   }, {
    //     id: 2,
    //     task_id: "0002",
    //     host: 1,
    //     start: 6,
    //     visible: false,
    //     values: [14, 35, 29, 17, 5]
    //   },
    //   {
    //     id: 3,
    //     task_id: "0001",
    //     host: 2,
    //     start: 0,
    //     visible: false,
    //     values: [12, 23, 29, 39, 20, 14, 5]
    //   }
    // ]

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
      return this.formatCPUData(this.jobData, response.data);
    });

  }


  // fromatCPUData
  // After our database calls, this function is fully responsible for
  // transforming the recieved data into a format the graph can understand
  formatCPUData(job_response, cpu_response) {
    console.log("job_response: ", job_response);
    console.log("cpu_response: ", cpu_response);

    // Push formatted results into this bad boy
    var returnTasks = [];

    // Transform all timestamps into Date objects
    for(var cpurec in cpu_response) {
      cpu_response[cpurec]["date"] = new Date(cpu_response[cpurec].timestamp);
    }

    // Go through and sort CPU results by time
    cpu_response.sort((a,b) => {
      if(a.date < b.date) return -1;
      if(a.date > b.date) return 1;
      else return 0;
    });

    // Keep track of which task id is in which index.
    var task_index_table = {};
    var hosts = {};

    // Make an object for each task, where we'll place our
    for(var task in job_response.tasks) {
      var t = job_response.tasks[task];
      var thisTask = {};

      if(!hosts[t.host]) {
        hosts[t.host] = {
          id: t.host,
          times: [],
          values: []
        };
      }

      thisTask["host"] = t.host;
      thisTask["task_id"] = t.task_id;
      thisTask["type"] = (t.isReduce) ? "reduce" : "map";
      thisTask["visible"] = this.VISIBLE_ON_INIT;
      thisTask["values"] = [];
      thisTask["times"] = [];

      var task_index = returnTasks.length;
      task_index_table[t.id] = task_index;

      returnTasks.push(thisTask);
    }

    for(var cpurec in cpu_response) {
      var c = cpu_response[cpurec];
      // var task_object = returnTasks[task_index_table[c.task]];
      var host_object = hosts[c.host];
      host_object.values.push(c.value);
      host_object.times.push(c.date);
    }

    var maxNumResults = 0;
    // Prune hosts with no results, keep track of max results
    for(var h in hosts) {
      if(hosts[h].values.length == 0)
        delete hosts[h];
      else if (hosts[h].values.length > maxNumResults) {
        maxNumResults = hosts[h].values.length;
      }
    }

    console.log("Host object: ", hosts);
    // Otherwise, push the values naively to the graph

    for(var i = 1; i <= maxNumResults; i++) {
      this.labels.push("Result "+i);
    }

    for(var h in hosts) {
      this.chartData.push(hosts[h].values);
    }
    this.tasks= returnTasks;

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
