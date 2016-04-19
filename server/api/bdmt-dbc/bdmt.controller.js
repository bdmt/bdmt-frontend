'use strict';

var bdmt = require('./bdmt.models');

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

export function allJobs(req, res) {
	return bdmt.Job.findAll()
		.then(respondWithResult(res))
		.catch(handleError(res));
}