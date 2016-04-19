var Sequelize = require('sequelize');
var dbcfg = require('../../config/local.env').bdmt;

var bdmt = {
	sequelize: new Sequelize(dbcfg.db_name, dbcfg.db_user, dbcfg.db_pass, {
		dialect: "postgres",
		port: 5432
	})
};

// JOB
// app_id: The YARN Application ID for this MR Job
// start_time: psql Timestamp object of start time
// end_time: psql Timestamp object of end time
bdmt.Job = bdmt.sequelize.define('Job', {
	app_id: Sequelize.STRING,
	start_time: Sequelize.DATE,
	end_time: Sequelize.DATE
}, {
	tableName: 'bdmt_jobs'
});

// TODO: Make more models :--)

module.exports = bdmt;