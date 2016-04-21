'use strict';

describe('Component: LoadComponent', function () {

  // load the controller's module
  beforeEach(module('bdmtRealApp'));

  var LoadComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    LoadComponent = $componentController('LoadComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
