'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:NavbarTopLinksCtrl
 * @description
 * # NavbarTopLinksCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
  .controller('NavbarTopLinksCtrl', function ($scope, simpleLogin) {

  		$scope.messages = [];

  		$scope.logout = simpleLogin.logout;

  });