'use strict';

var express = require('express');
var controller = require('./bdmt.controller');

var router = express.Router();

router.get("/jobs", controller.getAllJobs);
router.get("/jobs/:appid", controller.getJob);

// Given some app id and some task, find all of the CPU data for that task

// localhost:9000/api/bdmt/metric/cpu?app=1&task=3

router.get("/metric/:metricName", controller.getMetricData);
router.post("/metric/cpu", controller.postMetricData);

router.get("/hosts", controller.getHosts);

router.get('/*', function(req, res) {
	res.send("Invalid query");
});

module.exports = router;