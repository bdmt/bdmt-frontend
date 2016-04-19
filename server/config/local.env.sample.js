'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'bdmtreal-secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
  
  // A few bdmt-specific vars you should have below
  // Save-as this file as 'local.env.js', and overwrite this with credentials
  bdmt: {
    db_name: 'your_postgres_db_name',
    db_user: 'your_postgres_user',
    db_pass: 'your_postgres_password'
  }
  
};
