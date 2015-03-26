'use strict';

/**
 * @ngdoc service
 * @name tomTomApp.asset
 * @description
 * # asset
 * Factory in the tomTomApp.
 */
angular.module('tomTomApp')
  .factory('Asset', function (FBURL, $firebase, Firebase) {
    return $firebase(new Firebase(FBURL+'/assets')).$asArray();
  });

