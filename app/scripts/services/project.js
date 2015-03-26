'use strict';

/**
 * @ngdoc service
 * @name tomTomApp.project
 * @description
 * # project
 * Factory in the tomTomApp.
 */
angular.module('tomTomApp')
  .factory('Project', function (FBURL, $firebase, Firebase) {
    return $firebase(new Firebase(FBURL+'/projects')).$asArray();
  });
