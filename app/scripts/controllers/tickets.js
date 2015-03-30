'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:TicketsCtrl
 * @description
 * # TicketsCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
    .controller('TicketsCtrl', ['$scope', 'Ticket', 'Project', 'lodash', 'People', function($scope, Ticket, Project, _, People) {
        $scope.tickets = Ticket;
        $scope.displayedTickets = [].concat($scope.tickets);
 		$scope.allpeople = People;
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
            var save = Ticket.$add({
                tickettitle: $scope.newTicket.tickettitle,
                ticketdesc: $scope.newTicket.ticketdesc,
                ownerId: $scope.newTicket.owner.$id,
                projects: projects,
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
