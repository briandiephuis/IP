'use strict';

/**
 * @ngdoc filter
 * @name tomTomApp.filter:openTasks
 * @function
 * @description
 * # openTasks
 * Filter in the tomTomApp.
 */
angular.module('tomTomApp')
    .filter('openTasks', function() {
        return function(inputArray, closed) {

            if (!angular.isDefined(inputArray) || inputArray === '') {
                return inputArray;
            }
            var data = [];
            angular.forEach(inputArray, function(item) {
                if (item.status === 'Closed' || item.status === 'Completed') {
                    if (closed) {
                        data.push(item);
                    }
                } else {
                    if (!closed) {
                        data.push(item);
                    }
                }
            });
            return data;
        };

    });


// 	console.log(items);
// if (typeof(items) === 'undefined') {
//     return items;
// } else {
// 	debugger;
//     return items.filter(function(item) {
//         if (item.status === 'Completed' || item.status === 'Closed') {
//             return closed;
//         } else {
//             return !closed;
//         }
//     });
// }
