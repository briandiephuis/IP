'use strict';

describe('Filter: myEnglish', function () {

  // load the filter's module
  beforeEach(module('tomTomApp'));

  // initialize a new instance of the filter before each test
  var myEnglish;
  beforeEach(inject(function ($filter) {
    myEnglish = $filter('myEnglish');
  }));

  it('should return the input prefixed with "myEnglish filter:"', function () {
    var text = 'angularjs';
    expect(myEnglish(text)).toBe('myEnglish filter: ' + text);
  });

});
