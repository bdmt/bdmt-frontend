import bdmt from '../api/bdmt-dbc/bdmt.models';

if(!Date.now) {
	Date.now = function() {
		return new Date().getTime();
	}
}

bdmt.Job.sync()
	.then(() => {
		bdmt.Job.bulkCreate([{
			app_id: "test_12345",
			start_time: Date.now(),
			end_time: Date.now()+(60*1000)
		}, {
			app_id: "test_32268",
			start_time: Date.now(),
			end_time: Date.now()+(60*1000)
		}]);
	});
	
/*bdmt.Task.sync()
	.then(() => {
		
		bdmt.Task.findOrCreate()
		
		
	});*/