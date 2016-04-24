'use strict';
(function(){

class ManualdbComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('bdmtRealApp')
  .component('manualdb', {
    templateUrl: 'app/manualdb/manualdb.html',
    controller: ManualdbComponent
  });

})();
