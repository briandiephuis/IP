'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:AssetsCtrl
 * @description
 * # AssetsCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
    .controller('AssetsCtrl', ['$scope', 'Asset', 'Project', 'lodash', function($scope, Asset, Project, _) {
        $scope.assets = Asset;
        $scope.displayedAssets = [].concat($scope.assets);

        $scope.projects = Project;

        // New Asset
        var newAssetProto = {
            assetTitle: null,
            stage: null,
            mainType: {mainType:null},
            subType: null,
            projects: []
        };
        $scope.newAssetAccordion = {
            open: true
        };
        $scope.newAsset = angular.copy(newAssetProto);
        $scope.options = {
            stages: ['unregistered', 'pending', 'declined', 'registred'],
            types: [{
                mainType: 'Patent',
                subTypes: ['algorithm', 'software', 'mechanical']
            }, {
                mainType: 'Design right',
                subTypes: ['logo'],
            }, {
                mainType: 'Trademark',
                subTypes: ['logo'],
            }, {
                mainType: 'Non-disclosure agreement',
                subTypes: []
            }, ]
        };
        $scope.add = function() {
        	var projects = [];
        	angular.forEach($scope.newAsset.projects, function(project) {
        		projects.push(project.$id);
        	});
        	var save = Asset.$add({
                assetTitle: $scope.newAsset.assetTitle,
                stage: $scope.newAsset.stage,
                mainType: $scope.newAsset.mainType.mainType,
                subType: $scope.newAsset.subType,
                projects: projects,
            });

            if (save) {
                $scope.newAsset = angular.copy(newAssetProto);
            } else {

            }
        };
        $scope.addProject = function(project) {
        	if(typeof project === 'object'){
        		$scope.newAsset.projects.push(project);	
        		$scope.newAsset.project = '';
        	}
        	
        };
        $scope.removeProject = function(project) {
        	_.pull($scope.newAsset.projects,project);
        };

        $scope.remove = function(id) {
            Asset.$remove(id);
        };
    }]);
