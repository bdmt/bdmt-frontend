'use strict';

var bdmt = require('./bdmt.models');
var Promise = require('Promise');

// These functions from the generator are actually really useful,
// I'm just gonna copy a few over. :-)
function respondWithResult(res, statusCode) {
	statusCode = statusCode || 200;
	return function(entity) {
		if(entity) {
			res.status(statusCode).json(entity);
		}
	};
}

function handleError(res, statusCode) {
	statusCode = statusCode || 500;
	return function(err) {
		res.status(statusCode).send(err);
	};
}

// Returns the object itself if it exists
// If not, it will resolve the request with 404 and return null.
function catchEmptyResult(res) {
	return function(entity) {
		if(!entity) {
			res.status(404).end();
			return null;
		}
		return entity;
	};
}

// Hopefully returns the tasks from a certain job!
export function getJobTasks(req, res) {
	return bdmt.Task.find({
		where: {
			job_id: req.params.id
		}
	})
	.then(catchEmptyResult(res))
	.then(respondWithResult(res))
	.catch(handleError(res));
}

export function getAllJobs(req, res) {
	return bdmt.Job.findAll()
		.then(respondWithResult(res))
		.catch(handleError(res));
}

export function getJob(req, res) {
	return bdmt.Job.find({
		where: {
			id: req.params.id
		}
	})
	.then(catchEmptyResult(res))
	.then(respondWithResult(res))
	.catch(handleError(res));
}