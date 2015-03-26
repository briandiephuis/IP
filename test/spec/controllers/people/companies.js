'use strict';

describe('Controller: PeopleCompaniesCtrl', function () {

  // load the controller's module
  beforeEach(module('tomTomApp'));

  var PeopleCompaniesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeopleCompaniesCtrl = $controller('PeopleCompaniesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
