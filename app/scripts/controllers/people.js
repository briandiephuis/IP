'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
    .controller('PeopleCtrl', function($scope, $filter, People, Company) {
        $scope.people = People;
        $scope.displayedCollection = [].concat($scope.people);
        $scope.companies = Company;
        $scope.newPerson = {};
        $scope.add = function() {
            var save = People.$add({
                firstName: $scope.newPerson.firstName,
                lastName: $scope.newPerson.lastName,
                company: $scope.newPerson.company
            });

            if (save) {
                $scope.newPerson.firstName = '';
                $scope.newPerson.lastName = '';
                $scope.newPerson.company = '';
            } else {

            }
        };
        $scope.remove = function(id) {
            People.$remove(id);
        };

    });
