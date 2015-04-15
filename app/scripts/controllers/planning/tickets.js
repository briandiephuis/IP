'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:TicketsCtrl
 * @description
 * # TicketsCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
    .controller('PlanningTicketsCtrl', ['$scope', 'Ticket', 'Project', 'lodash', 'People', function($scope, Ticket, Project, _, People) {
        $scope.tickets = Ticket;
        $scope.displayedTickets = [].concat($scope.tickets);
 		$scope.allpeople = People;
        // $scope.companies = Company;
        $scope.projects = Project;

        // New Ticket
        var newTicketProto = {
            tickettitle: null,
            ticketdesc: null,
            owner: null,
            projects: []
        };
        $scope.newTicketAccordion = {
            open: true
        };
        $scope.newTicket = angular.copy(newTicketProto);
        $scope.add = function() {
            var projects = [];
            angular.forEach($scope.newTicket.projects, function(project) {
                projects.push(project.$id);
            });
            // console.log($scope.userPerson);
            var today = new Date();
            var ownerId = $scope.newTicket.owner?$scope.newTicket.owner.$id:$scope.userPerson.$id;
            var save = Ticket.$add({
                tickettitle: $scope.newTicket.tickettitle,
                ticketdesc: $scope.newTicket.ticketdesc,
                ownerId: ownerId,
                projects: projects,
                read: false,
                createdAt: today.toISOString()
            });

            if (save) {
                $scope.newTicket = angular.copy(newTicketProto);
            } else {}

        };
        
        $scope.remove = function(id) {
            Ticket.$remove(id);
        };
    }]);
