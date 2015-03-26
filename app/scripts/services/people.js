'use strict';

/**
 * @ngdoc service
 * @name tomTomApp.People
 * @description
 * # People
 * Factory in the tomTomApp.
 */
angular.module('tomTomApp')
  .factory('People', function (FBURL, $firebase) {
    return $firebase(new Firebase(FBURL+'/people')).$asArray();
  });
