'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
  .controller('ProjectsCtrl', ['$scope', 'Project', function ($scope, Project) {
    $scope.projects = Project;
    
  }]);
