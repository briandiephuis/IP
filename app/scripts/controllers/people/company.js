'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:PeopleCompanyCtrl
 * @description
 * # PeopleCompanyCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
  .controller('PeopleCompanyCtrl', function ($scope, $stateParams, FBURL, $firebase, Firebase) {
  	// Get current company after loading them all
  	// 
  	// Company.$loaded(function() {
  	// 	var key = $scope.companies.$indexFor($stateParams.id);
  	// 	$scope.company = Company[key];
  	// 	console.log($scope.companies);
  	// 	console.log($scope.company);
  	// });

  	var ref = new Firebase(FBURL).child('companies').child($stateParams.id);
  	$scope.company = $firebase(ref).$asObject();
  	$scope.devisions = $firebase(ref.child('devisions')).$asArray();

  	$scope.newDevision = {};
  	$scope.addDevision = function() {
  		$scope.devisions.$add($scope.newDevision);
		$scope.newDevision = {}; 
  	};
  	$scope.removeDevision = function(id) {
  		$scope.devisions.$remove(id);
  	};
	
  });
