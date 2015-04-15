'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:PlanningCtrl
 * @description
 * # PlanningCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
  .controller('PlanningCtrl', ['$scope', 'Ticket', 'Project', 'lodash', 'People', 'Company', function ($scope, Ticket, Project, _, People, Company) {
		$scope.tickets = Ticket;
        $scope.displayedTickets = [].concat($scope.tickets);
 		$scope.allpeople = People;
        $scope.companies = Company;
        $scope.projects = Project;

        // $scope.tickets.$loaded(function(){
        // console.log($scope.tickets);
        // });

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
        var today = new Date(); 
        $scope.add = function() {
            var projects = [];
            angular.forEach($scope.newTicket.projects, function(project) {
                projects.push(project.$id);
            });
            console.log($scope.userPerson);
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
        // Add project
        $scope.$watch('newTicket.project', function(newValue) {
            if (typeof newValue === 'object') {
                console.log(_.findIndex($scope.newTicket.projects, newValue));
                if (_.findIndex($scope.newTicket.projects, newValue) === -1) {
                    $scope.newTicket.projects.push(newValue);
                } else {
                    // doubles not allowed
                    var i = _.findIndex($scope.newTicket.projects, function(chr) {
                        return chr.projectTitle === newValue.projectTitle;
                    });
                    $scope.newTicket.projects[i].highlight = true;
                }
                $scope.newTicket.project = '';
            }
        });
        $scope.removeProject = function(project) {
            _.pull($scope.newTicket.projects, project);
        };

        $scope.remove = function(id) {
            Ticket.$remove(id);
        };
  }]);
