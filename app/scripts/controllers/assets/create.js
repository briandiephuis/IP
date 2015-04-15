'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:AssetsCreateCtrl
 * @description
 * # AssetsCreateCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
    .controller('AssetsCreateCtrl', function($rootScope, $scope, $stateParams, $state, Asset, Project, lodash) {
        $scope.assets = Asset;
        $scope.projects = Project;

        console.log($rootScope.newAsset);

        // New Asset
        if ($rootScope.newAsset) {
            $scope.newAsset = {
                assetTitle: $rootScope.newAsset.tickettitle,
                assetDescription: $rootScope.newAsset.ticketdesc,
                stage: null,
                mainType: {
                    mainType: null
                },
                subType: null,
                projects: []
            };
        } else {
            $scope.newAsset = {
                assetTitle: null,
                stage: null,
                mainType: {
                    mainType: null
                },
                subType: null,
                projects: []
            };
        }

        // Add project
        $scope.$watch('newAsset.project', function(newValue) {
            if (typeof newValue === 'object') {
                console.log(lodash.findIndex($scope.newAsset.projects, newValue));
                if (lodash.findIndex($scope.newAsset.projects, newValue) === -1) {
                    $scope.newAsset.projects.push(newValue);
                } else {
                    // doubles not allowed
                    var i = lodash.findIndex($scope.newAsset.projects, function(chr) {
                        return chr.projectTitle === newValue.projectTitle;
                    });
                    $scope.newAsset.projects[i].highlight = true;
                }
                $scope.newAsset.project = '';
            }
        });
        $scope.removeProject = function(project) {
            lodash.pull($scope.newAsset.projects, project);
        };

        $scope.add = function() {
            var projects = [];
            angular.forEach($scope.newAsset.projects, function(project) {
                projects.push(project.$id);
            });
            Asset.$add({
                assetTitle: $scope.newAsset.assetTitle,
                assetDescription: $scope.newAsset.assetDescription,
                stage: $scope.newAsset.stage,
                mainType: $scope.newAsset.mainType.mainType,
                subType: $scope.newAsset.subType,
                projects: projects,
            }).then(function(resp) {
            	$state.go('assets.asset', {id: resp.path.w[1]});
            });

            

        };

    });
