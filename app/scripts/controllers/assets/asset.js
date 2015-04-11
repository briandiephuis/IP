'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:AssetsAssetCtrl
 * @description
 * # AssetsAssetCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
    .controller('AssetsAssetCtrl', function($scope, FBURL, $firebase, Firebase, $stateParams, People, EspaceNet, langFilter, lodash) {
        var ref = new Firebase(FBURL).child('assets').child($stateParams.id);
        $scope.asset = $firebase(ref).$asObject();
        $scope.people = People;

        // Example patents from different countries
        // US2014266798
        // WO2015036595 - WO2014106617 
        // AU2013350713
        // TW201502476 
        $scope.newPatent = {
            show: true,
            applicationNumber: 'US2014266798'
        };
        $scope.asset.$loaded(function(){
            if($scope.asset.patents) {
                $scope.newPatent.show = false;
            }
        });

        $scope.addPatent = function() {
            if (Object.prototype.toString.call($scope.asset.patents) !== '[object Array]') {
                $scope.asset.patents = []; // Create patents array if it did not exist
            }
            var t = langFilter($scope.newPatent.patent['bibliographic-data']['invention-title'], 'en'); // get the title in English
            $scope.asset.patents.push({ // Add object to patents array
                'applicationNumber': $scope.newPatent.applicationNumber,
                'inventionTitle': t
            }); 
            $scope.asset.$save().then(function() { // update asset with added patent
                $scope.newPatent = {}; // clear 'newPatent'
            });
        };

        $scope.removePatent = function(patent) {
            lodash.pull($scope.asset.patents, patent);
            $scope.asset.$save();
            if ($scope.asset.patents.length===0) {
                $scope.newPatent.show = true;
            }
        };

        $scope.getNewPatent = function() {
            var ref = $scope.newPatent.applicationNumber;
            EspaceNet.get(ref)
            .success(function() {
                $scope.newPatent.success = true;
            })
            .error(function() {
                $scope.newPatent.success = false;
            })
            .then(function(patent) {
                $scope.newPatent.patent = patent.data['ops:world-patent-data']['exchange-documents']['exchange-document'];
                $scope.newPatent.success = (patent.data['@status'])?false:true;
                console.log(patent);
                debugger;
            });
        };





        $scope.map = {
            type: 'world',
            data: [{
                values: [{
                    'location': 'USA',
                    'value': 125
                }, {
                    'location': 'CAN',
                    'value': 50
                }, {
                    'location': 'FRA',
                    'value': 70
                }, {
                    'location': 'RUS',
                    'value': 312
                }]
            }],
            colors: ['#666666', '#b9b9b9', '#fafafa'],
            options: {
                width: 450,
                legendHeight: 0 // optionally set the padding for the legend
            }
        };

        $scope.newTask = {};
        $scope.options = {
            statusList: [
                'Rejected',
                'Assigned',
                'Accepted',
                'In Progress',
                'Waiting',
                'Change pending',
                'Completed',
                'Closed'
            ]
        };






    });
