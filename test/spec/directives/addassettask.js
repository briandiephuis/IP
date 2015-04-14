'use strict';

describe('Directive: addAssetTask', function () {

  // load the directive's module
  beforeEach(module('tomTomApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-asset-task></add-asset-task>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the addAssetTask directive');
  }));
});