'use strict';

/**
 * @ngdoc service
 * @name tomTomApp.espaceNet
 * @description
 * # espaceNet
 * Factory in the tomTomApp.
 */
angular.module('tomTomApp')
    .factory('EspaceNet', ['$http', function($http) {
        // var url = 'http://ops.epo.org/3.1/rest-services/published-data/publication/epodoc/WO2015036595/abstract.xml';
        // url = 'http://ops.epo.org/rest-services/published-data/publication/epodoc/WO2015036595.json';

        return {
            get: function(reference) {
                console.log('Getting patent: '+reference);
                return $http.get('http://ops.epo.org/3.1/rest-services/published-data/publication/docdb/' + reference + '/biblio.json')
                    .success(function(data) {
                        return data['ops:world-patent-data']['exchange-documents']['exchange-document'];
                    });
            }
        };
    }]);
