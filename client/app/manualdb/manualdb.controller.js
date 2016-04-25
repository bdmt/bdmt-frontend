'use strict';
(function(){

class ManualdbComponent {
  constructor($http, $location) {
  	this.$http = $http;
  	this.$location = $location;
  	this.cpurec = {};
  	this.prettyJson = JSON.stringify(this.cpurec, null, 4);
  }
  
  submitCPURecord(record) {
  	
  	if(!record.app || !record.task || !record.host || !record.value)
  		return;
  	
  	// Throw in the current timestamp if invalid
  	if(!record.timestamp) {
  		record.timestamp = (new Date()).toUTCString();
  	}
  	
  	return this.$http.post("/api/bdmt/metric/cpu", record);
  }
  
}

angular.module('bdmtRealApp')
  .component('manualdb', {
    templateUrl: 'app/manualdb/manualdb.html',
    controller: ManualdbComponent
  });

})();
