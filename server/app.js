/**
 * Main application file
 */

'use strict';

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';

import bdmt from './api/bdmt-dbc/bdmt.models';

// Populate databases with sample data
// if (config.seedDB) { require('./config/seed'); }
if(config.seedDB) {
  console.log("Creating our test data!");
	require('./config/bdmt.testdata');
}

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

bdmt.sequelize.sync()
	.then(startServer)
	.catch(function(err) {
    console.log("BDMT database failed to sync: ", err);
	});


// Expose app
exports = module.exports = app;
