var bdmt = require('../api/bdmt-dbc/bdmt.models');

if(!Date.now) {
	Date.now = function() {
		return new Date().getTime();
	}
}

bdmt.Job.sync()
	.then(() => {
		return bdmt.Job.findOrCreate({
			where: {
				app_id: "test_12345"
			},
			defaults: {
				start_time: Date.now(),
				end_time: Date.now()
			}
		});
	})
	.then(() => {
		return bdmt.Job.findOrCreate({
			where: {
				app_id: "test_32268"
			},
			defaults: {
				start_time: Date.now(),
				end_time: Date.now()
			}
		});
	});

bdmt.Task.sync()
	.then(() => {
		return bdmt.Task.findOrCreate({
			where: {
				app_id: "test_12345",
				task_id: "0001",
				is_reduce: false
			}
		});
	}).then(() => {
		return bdmt.Task.findOrCreate({
			where: {
				app_id: "test_12345",
				task_id: "0002",
				is_reduce: false
			}
		});
	}).then(() => {
		return bdmt.Task.findOrCreate({
			where: {
				app_id: "test_12345",
				task_id: "0001",
				is_reduce: true
			}
		});
	}).then(() => {
		return bdmt.Task.findOrCreate({
			where: {
				app_id: "test_32268",
				task_id: "0001",
				is_reduce: false
			}
		});
	}).then(() => {
		return bdmt.Task.findOrCreate({
			where: {
				app_id: "test_32268",
				task_id: "0001",
				is_reduce: true
			}
		});
	});

	
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