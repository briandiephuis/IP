'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
