var bdmt = require('../api/bdmt-dbc/bdmt.models');

if(!Date.now) {
	Date.now = function() {
		return new Date().getTime();
	}
}

var bdmt_now = Date.now();
var bdmt_duration = 60*1000;
var bdmt_interval = 5*1000;

bdmt.Job.sync()
	.then(() => {
		return bdmt.Job.findOrCreate({
			where: {
				app_id: "test_12345"
			},
			defaults: {
				start_time: bdmt_now,
				end_time: bdmt_now+bdmt_duration
			}
		});
	})
	.then(() => {
		return bdmt.Job.findOrCreate({
			where: {
				app_id: "test_32268"
			},
			defaults: {
				start_time: bdmt_now,
				end_time: bdmt_now+bdmt_duration
			}
		});
	});

bdmt.Task.sync()
	.then(() => {
		return bdmt.Task.findOrCreate({
			where: {
				app: 1,
				task_id: "0001",
				is_reduce: false
			},
			defaults: {
				host: 1,
				start_time: bdmt_now,
				end_time: bdmt_now+(bdmt_duration)/2
			}
		});
	}).then(() => {
		return bdmt.Task.findOrCreate({
			where: {
				app: 1,
				task_id: "0002",
				is_reduce: false
			},
			defaults: {
				host: 2,
				start_time: bdmt_now,
				end_time: bdmt_now+(bdmt_duration)/3
			}
		});
	}).then(() => {
		return bdmt.Task.findOrCreate({
			where: {
				app: 1,
				task_id: "0001",
				is_reduce: true
			},
			defaults: {
				host: 3,
				start_time: bdmt_now+bdmt_duration/2,
				end_time: bdmt_now+bdmt_duration
			}
		});
	}).then(() => {
		return bdmt.Task.findOrCreate({
			where: {
				app: 2,
				task_id: "0001",
				is_reduce: false
			},
			defaults: {
				host: 1,
				start_time: bdmt_now,
				end_time: bdmt_now+bdmt_duration/3
			}
		});
	}).then(() => {
		return bdmt.Task.findOrCreate({
			where: {
				app: 2,
				task_id: "0001",
				is_reduce: true
			},
			defaults: {
				host: 1,
				start_time: bdmt_now+bdmt_duration/2,
				end_time: bdmt_now+bdmt_duration
			}
		});
	});
	
bdmt.Host.sync()
	.then(() => {
		return bdmt.Host.findOrCreate({
			where: {
				hostname: "ip-172-31-15-148.ec2.internal"
			}
		});
	})
	.then(() => {
		return bdmt.Host.findOrCreate({
			where: {
				hostname: "ip-172-31-58-62.ec2.internal"
			}
		});
	})
	.then(() => {
		return bdmt.Host.findOrCreate({
			where: {
				hostname: "ip-172-31-58-61.ec2.internal"
			}
		});
	});

bdmt.CPUMetric.sync()
.then(bdmt.CPUMetric.find({
	where: {
		app: 1
	}
}))
.then((result) => {
	if(result) return;
	
	// Otherwise, populate the table...
	return bdmt.CPUMetric.findOrCreate({
		where: {
			app: 1,
			host: 1,
			timestamp: bdmt_now,
			value: 1.5
		}
	}).then(() => {
		return bdmt.CPUMetric.findOrCreate({
			where: {
				app: 1,
				host: 1,
				timestamp: bdmt_now+5000,
				value: 6.8
			}
		});
	})
	.then(() => {
		return bdmt.CPUMetric.findOrCreate({
			where: {
				app: 1,
				host: 1,
				timestamp: bdmt_now+10000,
				value: 4.19
			}
		});
	})
	.then(() => {
		return bdmt.CPUMetric.findOrCreate({
			where: {
				app: 1,
				host: 1,
				timestamp: bdmt_now+15000,
				value: 2.1
			}
		});
	})
	.then(() => {
		return bdmt.CPUMetric.findOrCreate({
			where: {
				app: 1,
				host: 2,
				timestamp: bdmt_now,
				value: 0.5
			}
		});
	})
	.then(() => {
		return bdmt.CPUMetric.findOrCreate({
			where: {
				app: 1,
				host: 2,
				timestamp: bdmt_now+5000,
				value: 10.8
			}
		});
	})
	.then(() => {
		return bdmt.CPUMetric.findOrCreate({
			where: {
				app: 1,
				host: 2,
				timestamp: bdmt_now+10000,
				value: 5.3
			}
		});
	})
	.then(() => {
		return bdmt.CPUMetric.findOrCreate({
			where: {
				app: 1,
				host: 2,
				timestamp: bdmt_now+15000,
				value: 3.1
			}
		});
	});
});
	

// Check for first one and add it.
// 

/*bdmt.CPUMetric.sync()
	.then(() => {
		return bdmt.CPUMetric.findOrCreate({
			where: {
				value:
			}
		});
	})*/
/*bdmt.Task.sync()
	.then(() => {
		
		bdmt.Task.findOrCreate()
		
		
	});
	
bdmt.Job.bulkCreate([{
		app_id: "test_12345",
		start_time: Date.now(),
		end_time: Date.now()+(60*1000)
	}, {
		app_id: "test_32268",
		start_time: Date.now(),
		end_time: Date.now()+(60*1000)
	}]);
	
	*/