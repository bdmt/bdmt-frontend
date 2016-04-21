'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
    'title': 'Jobs',
    'state': 'jobs'
  }
  ];

  isCollapsed = true;
  //end-non-standard

  constructor() {}
}

angular.module('bdmtRealApp')
  .controller('NavbarController', NavbarController);
