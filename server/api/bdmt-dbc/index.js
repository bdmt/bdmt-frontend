'use strict';

var express = require('express');
var controller = require('./bdmt.controller');

var router = express.Router();

router.get("/jobs", controller.allJobs);
//router.get("/hosts");

router.get('/*', function(req, res) {
	res.send("This query did not hit a specific route.");
});

module.exports = router;