'use strict';

describe('Filter: task', function () {

  // load the filter's module
  beforeEach(module('tomTomApp'));

  // initialize a new instance of the filter before each test
  var task;
  beforeEach(inject(function ($filter) {
    task = $filter('task');
  }));

  it('should return the input prefixed with "task filter:"', function () {
    var text = 'angularjs';
    expect(task(text)).toBe('task filter: ' + text);
  });

});
