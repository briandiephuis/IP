'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:AssetsAssetCtrl
 * @description
 * # AssetsAssetCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
    .controller('AssetsAssetCtrl', function($scope, FBURL, $firebase, Firebase, $stateParams, People) {
        var ref = new Firebase(FBURL).child('assets').child($stateParams.id);
        $scope.asset = $firebase(ref).$asObject();
        $scope.people = People;
        

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
