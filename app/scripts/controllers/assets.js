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
            stages: ['unregistered', 'pending', 'declined', 'registred', 'stage-less', 'undefined'],
            types: [{
                mainType: 'Patent',
                subTypes: ['Hardware', 'Logic', 'Otherwise']
            }, {
                mainType: 'Design right',
                subTypes: ['Product design', 'Otherwise'],
            }, {
                mainType: 'Trademark',
                subTypes: ['Logo', 'Name', 'Combination', 'Otherwise'],
            }, {
                mainType: 'Non-disclosure agreement',
                subTypes: ['']
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

        // Add project
        $scope.$watch('newAsset.project', function(newValue){
            if(typeof newValue === 'object'){
                console.log(_.findIndex($scope.newAsset.projects, newValue));
                if(_.findIndex($scope.newAsset.projects, newValue)===-1) {
                    $scope.newAsset.projects.push(newValue); 
                } else {
                    // doubles not allowed
                    var i = _.findIndex($scope.newAsset.projects, function(chr) {
                        return chr.projectTitle === newValue.projectTitle;
                    });
                    $scope.newAsset.projects[i].highlight = true;
                }
                $scope.newAsset.project = '';
            }
        });
        $scope.removeProject = function(project) {
        	_.pull($scope.newAsset.projects,project);
        };

        $scope.remove = function(id) {
            Asset.$remove(id);
        };
    }]);
