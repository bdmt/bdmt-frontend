'use strict';

describe('Component: ManualdbComponent', function () {

  // load the controller's module
  beforeEach(module('bdmtRealApp'));

  var ManualdbComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ManualdbComponent = $componentController('ManualdbComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
