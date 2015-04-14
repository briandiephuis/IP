'use strict';

/**
 * @ngdoc directive
 * @name tomTomApp.directive:addAssetTask
 * @description
 * # addAssetTask
 */
angular.module('tomTomApp')
    .directive('addAssetTask', function() {
        return {
            templateUrl: 'scripts/directives/addAssetTask.html',
            restrict: 'E',
            link: function(scope, element, attrs) {
            	attrs.asset.$loaded(function(){
            		console.log(attrs.asset);
            	});
                
            }
        };
    });
