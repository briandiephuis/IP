'use strict';

describe('Filter: openTasks', function () {

  // load the filter's module
  beforeEach(module('tomTomApp'));

  // initialize a new instance of the filter before each test
  var openTasks;
  beforeEach(inject(function ($filter) {
    openTasks = $filter('openTasks');
  }));

  it('should return the input prefixed with "openTasks filter:"', function () {
    var text = 'angularjs';
    expect(openTasks(text)).toBe('openTasks filter: ' + text);
  });

});
