'use strict';

describe('Controller: PlanningTicketCtrl', function () {

  // load the controller's module
  beforeEach(module('tomTomApp'));

  var PlanningTicketCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlanningTicketCtrl = $controller('PlanningTicketCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
