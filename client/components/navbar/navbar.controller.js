'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Jobs',
    'state': 'jobs'
  }, {
    'title': 'Manual Database Access',
    'state': 'manualdb'
  }
  ];

  isCollapsed = true;
  //end-non-standard

  constructor() {}
}

angular.module('bdmtRealApp')
  .controller('NavbarController', NavbarController);
