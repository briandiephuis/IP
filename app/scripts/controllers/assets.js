'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:AssetsCtrl
 * @description
 * # AssetsCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
  .controller('AssetsCtrl', function ($scope, Assets) {
        $scope.assets = Assets;
        $scope.displayedAssets = [].concat($scope.assets);

        $scope.newAsset = {};
        $scope.add = function() {
            var save = Assets.$add({
                firstName: $scope.newPerson.firstName,
                lastName: $scope.newPerson.lastName,
                company: $scope.newPerson.company
            });

            if (save) {
                $scope.newAsset.firstName = '';

            } else {

            }
        };
        $scope.remove = function(id) {
            Assets.$remove(id);
        };
  });
