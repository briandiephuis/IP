'use strict';

describe('Filter: lang', function () {

  // load the filter's module
  beforeEach(module('tomTomApp'));

  // initialize a new instance of the filter before each test
  var lang;
  beforeEach(inject(function ($filter) {
    lang = $filter('lang');
  }));

  it('should return the input prefixed with "lang filter:"', function () {
    var text = 'angularjs';
    expect(lang(text)).toBe('lang filter: ' + text);
  });

});
