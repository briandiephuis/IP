'use strict';

/**
 * @ngdoc service
 * @name tomTomApp.Company
 * @description
 * # Company
 * Factory in the tomTomApp.
 */
angular.module('tomTomApp')
  .factory('Company', function (FBURL, $firebase, Firebase) {
    return $firebase(new Firebase(FBURL+'/companies')).$asArray();
  });
