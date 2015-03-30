'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:PeopleCompaniesCtrl
 * @description
 * # PeopleCompaniesCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
    .controller('PeopleCompaniesCtrl', function($scope, Company) {
        $scope.newCompany = {};
        $scope.add = function() {
            console.log($scope.newCompany.companyName);
            var save = Company.$add({
                companyName: $scope.newCompany.companyName
            });

            if (save) {
                $scope.newCompany.companyName = '';
            } else {

            }
        };

        $scope.remove = function(id) {
            Company.$remove(id);
        };

        $scope.companies = Company;

    });
