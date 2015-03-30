'use strict';

describe('Controller: PeopleCompanyCtrl', function () {

  // load the controller's module
  beforeEach(module('tomTomApp'));

  var PeopleCompanyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeopleCompanyCtrl = $controller('PeopleCompanyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
