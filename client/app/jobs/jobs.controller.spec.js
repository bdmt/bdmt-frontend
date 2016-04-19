'use strict';

describe('Component: JobsComponent', function () {

  // load the controller's module
  beforeEach(module('job'));

  var JobsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    JobsComponent = $componentController('JobsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
