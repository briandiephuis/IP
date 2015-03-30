'use strict';

/**
 * @ngdoc service
 * @name tomTomApp.ticket
 * @description
 * # ticket
 * Factory in the tomTomApp.
 */
angular.module('tomTomApp')
  .factory('Ticket', function (FBURL, $firebase, Firebase) {
    return $firebase(new Firebase(FBURL+'/tickets')).$asArray();
  });

