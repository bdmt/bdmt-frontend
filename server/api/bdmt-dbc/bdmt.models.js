var Sequelize = require('sequelize');
var dbcfg = require('../../config/local.env').bdmt;

var bdmt = {
	sequelize: new Sequelize(dbcfg.db_name, dbcfg.db_user, dbcfg.db_pass, {
		dialect: "postgres",
		port: 5432
	})
};

// JOB
// app_id:      The YARN Application ID for this MR Job
// start_time:  psql Timestamp object of start time
// end_time:    psql Timestamp object of end time
bdmt.Job = bdmt.sequelize.define('Job', {
	app_id: Sequelize.STRING,
	start_time: Sequelize.DATE,
	end_time: Sequelize.DATE
}, {
	tableName: 'bdmt_jobs'
});


// TASK
// job_id:   This is an integer that references the ID column of the
//           corresponding entry in the bdmt_jobs table.
// type:     A single char, either 'r', or 'm', for 'map' or 'reduce'.
// task_id:  The YARN Task ID for this Task. Could have leading zeroes,
//           so we use a string.
bdmt.Task = bdmt.sequelize.define('Task', {
	
	job_id: Sequelize.INTEGER,
	type: Sequelize.CHAR,
	task_id: Sequelize.STRING
	
}, {
	tableName: 'bdmt_tasks'
});


// HOST
// hostname: The UNIX hostname of this node in the cluster.
bdmt.Host = bdmt.sequelize.define('Host', {
	hostname: Sequelize.STRING
}, {
	tableName: 'bdmt_hosts'
});

// TODO: Make more models :--)

module.exports = bdmt;