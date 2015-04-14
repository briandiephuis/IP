'use strict';

describe('Filter: countryCode', function () {

  // load the filter's module
  beforeEach(module('tomTomApp'));

  // initialize a new instance of the filter before each test
  var countryCode;
  beforeEach(inject(function ($filter) {
    countryCode = $filter('countryCode');
  }));

  it('should return the input prefixed with "countryCode filter:"', function () {
    var text = 'angularjs';
    expect(countryCode(text)).toBe('countryCode filter: ' + text);
  });

});
