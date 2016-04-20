'use strict';

var express = require('express');
var controller = require('./bdmt.controller');

var router = express.Router();

router.get("/jobs", controller.getAllJobs);
router.get("/jobs/:appid", controller.getJob);
router.get("/jobs/:appid/tasks", controller.getJobTasks);
//router.get("/hosts");

router.get('/*', function(req, res) {
	res.send("Invalid query");
});

module.exports = router;