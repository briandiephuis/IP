'use strict';

describe('Controller: PlanningCtrl', function () {

  // load the controller's module
  beforeEach(module('tomTomApp'));

  var PlanningCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlanningCtrl = $controller('PlanningCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
