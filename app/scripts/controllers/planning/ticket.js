'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:PlanningTicketCtrl
 * @description
 * # PlanningTicketCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
    .controller('PlanningTicketCtrl', function($rootScope, $scope, $stateParams, $state, Ticket, Project, lodash, People, FBURL, Firebase, $firebase) {
        $scope.tickets = Ticket;
        $scope.allpeople = People;
        $scope.projects = Project;

        var ref = new Firebase(FBURL).child('tickets').child($stateParams.id);
        $scope.ticket = $firebase(ref).$asObject();

        $scope.markRead = function(set) {
        	$scope.ticket.read = set;
        	$scope.ticket.$save();
        };

        $scope.createAsset = function() {
            $scope.markRead(true);
            $rootScope.newAsset = $scope.ticket;
        	$state.go('assets.create');
        };

        $scope.declineAsset = function() {
            $scope.markRead(true);
            $scope.ticket.declined = true;
            $scope.ticket.declineReason = $scope.declineReason;
            $scope.ticket.$save();
            $state.go('planning.tickets');
        };

    });
