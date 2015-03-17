'use strict';

describe('Controller: NavbarTopLinksCtrl', function () {

  // load the controller's module
  beforeEach(module('tomTomApp'));

  var NavbarTopLinksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavbarTopLinksCtrl = $controller('NavbarTopLinksCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
