'use strict';

describe('Service: espaceNet', function () {

  // load the service's module
  beforeEach(module('tomTomApp'));

  // instantiate service
  var espaceNet;
  beforeEach(inject(function (_espaceNet_) {
    espaceNet = _espaceNet_;
  }));

  it('should do something', function () {
    expect(!!espaceNet).toBe(true);
  });

});
