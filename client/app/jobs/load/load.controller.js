'use strict';
(function(){

class LoadComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('bdmtRealApp')
  .component('load', {
    templateUrl: 'app/jobs/load/load.html',
    controller: LoadComponent
  });

})();
