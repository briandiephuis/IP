'use strict';

/**
 * @ngdoc service
 * @name tomTomApp.espaceNet
 * @description
 * # espaceNet
 * Factory in the tomTomApp.
 */
angular.module('tomTomApp')
    .factory('EspaceNet', ['$http', 'x2js', function($http, x2js) {
        var url = 'http://ops.epo.org/3.1/rest-services/published-data/publication/epodoc/WO2015036595/abstract.xml';
        return {
            get: function(callback) {
                $http.get(url, {
                        transformResponse: function(data) {
                            console.log(x2js);
                            console.log(data);
                            var json = x2js.xml_str2json(data);
                            console.log(json);
                            return  json;
                        }
                    })
                    .success(function(data) {
                        callback(data);
                    });
            }
        };


    }]);
