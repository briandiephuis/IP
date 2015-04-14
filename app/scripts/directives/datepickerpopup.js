'use strict';

/**
 * @ngdoc directive
 * @name tomTomApp.directive:datepickerPopup
 * @description
 * # datepickerPopup
 */
angular.module('tomTomApp')
    .directive('datepickerPopup', function() {
        return {
            restrict: 'EAC',
            require: 'ngModel',
            link: function(scope, element, attr, controller) {
                //remove the default formatter from the input directive to prevent conflict
                controller.$formatters.shift();
            }
        };
    });
