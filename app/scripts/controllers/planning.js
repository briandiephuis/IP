'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:PlanningCtrl
 * @description
 * # PlanningCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
  .controller('PlanningCtrl', function ($scope, Ticket, Project, People, Company) {
        $scope.tickets = Ticket;
        $scope.projects = Project;
        $scope.people = People;
        $scope.companies = Company;
  });
