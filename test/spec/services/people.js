'use strict';

describe('Service: People', function () {

  // load the service's module
  beforeEach(module('tomTomApp'));

  // instantiate service
  var People;
  beforeEach(inject(function (_People_) {
    People = _People_;
  }));

  it('should do something', function () {
    expect(!!People).toBe(true);
  });

});
