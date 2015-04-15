'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:AssetsAssetCtrl
 * @description
 * # AssetsAssetCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
    .controller('AssetsAssetCtrl', function($scope, FBURL, $firebase, Firebase, $stateParams, People, EspaceNet, langFilter, lodash, countryCodeFilter) {
        var ref = new Firebase(FBURL).child('assets').child($stateParams.id);
        $scope.asset = $firebase(ref).$asObject();
        $scope.people = People;
        var countries = ['AFG', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BIH', 'BWA', 'BRA', 'IOT', 'VGB', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 'COL', 'COM', 'COK', 'CRI', 'HRV', 'CUB', 'CUW', 'CYP', 'CZE', 'COD', 'DNK', 'DJI', 'DMA', 'DOM', 'TLS', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'PYF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'CIV', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MKD', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'ANT', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'PRK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'COG', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'KOR', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'VIR', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'URY', 'UZB', 'VUT', 'VAT', 'VEN', 'VNM', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE'];

        // Example patents from different countries
        // US2014266798
        // WO2015036595 - WO2014106617 
        // AU2013350713
        // TW201502476 
        $scope.newPatent = {
            show: true,
            applicationNumber: 'US2014266798'
        };
        $scope.asset.$loaded(function() {
            if ($scope.asset.patents) {
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
                'inventionTitle': t,
                'country': countryCodeFilter($scope.newPatent.patent['@country']),
                'kind': $scope.newPatent.patent['@kind']
            });
            $scope.asset.$save() // update asset with added patent
                .then(function() {
                    $scope.newPatent = {}; // clear 'newPatent'
                });
        };

        $scope.loadPatent = function(applicationNumber) {
            $scope.tabPatent = {};
            EspaceNet.get(applicationNumber)
                .then(function(patent) {
                    $scope.tabPatent.patent = patent.data['ops:world-patent-data']['exchange-documents']['exchange-document'];
                    $scope.tabPatent.success = ($scope.tabPatent.patent['@status']) ? false : true;
                    console.log($scope.tabPatent.patent);
                });
        };

        $scope.removePatent = function(patent) {
            lodash.pull($scope.asset.patents, patent);
            $scope.asset.$save();
            if ($scope.asset.patents.length === 0) {
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
                    $scope.newPatent.success = ($scope.newPatent.patent['@status']) ? false : true;
                });
            EspaceNet.getEquivalents(ref)
                .then(function(equivalents) {
                    $scope.newPatent.equivalents = equivalents.data['ops:world-patent-data']['ops:equivalents-inquiry']['ops:inquiry-result'];
                    console.log($scope.newPatent.equivalents);
                });
        };


        $scope.$watch('asset', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                if ($scope.asset.hasOwnProperty('patents')) {
                    var dataPush = [];
                    angular.forEach($scope.asset.patents, function(patent) {
                        if (patent.country === 'WO') {
                            for (var i = countries.length - 1; i >= 0; i--) {
                                var already = lodash.find(dataPush, {
                                    'location': countries[i]
                                });
                                if (already === undefined) {
                                    dataPush.push({
                                        'location': countries[i],
                                        'value': 1
                                    });
                                } else {
                                    // already.value += 10;
                                }
                            }
                        } else {
                            var already2 = lodash.find(dataPush, {
                                'location': patent.country
                            });
                            if (already2 === undefined) {
                                dataPush.push({
                                    'location': patent.country,
                                    'value': 1
                                });
                            } else {
                                // already.value += 10;
                            }
                        }
                    });
                    $scope.map.data[0].values = dataPush;
                }
            }
        }, true);

        $scope.map = {
            type: 'world',
            data: [{
                values: []
            }],
            colors: ['#666666', '#b9b9b9', '#fafafa'],
            options: {
                width: 450,
                legendHeight: 0 // optionally set the padding for the legend
            }
        };



        /**
         * New Task
         */
        $scope.newTask = {};
        $scope.today = function() {
            $scope.newTask.startDate = new Date();
        };
        $scope.today();
        $scope.clearStart = function() {
            $scope.newTask.startDate = null;
        };
        $scope.openStart = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.startOpened = true;
        };
        $scope.clearEnd = function() {
            $scope.newTask.startDate = null;
        };
        $scope.openEnd = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.endOpened = true;
        };
        $scope.newTaskOptions = {
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

        $scope.addTask = function() {
            if (Object.prototype.toString.call($scope.asset.tasks) !== '[object Array]') {
                $scope.asset.tasks = []; // Create tasks array if it did not yet exist
            }
            var ownerId = (typeof($scope.newTask.owner) === 'object') ? $scope.newTask.owner.$id : null;
            var startDate = ($scope.newTask.startDate) ? $scope.newTask.startDate.toISOString() : null;
            var endDate = ($scope.newTask.endDate) ? $scope.newTask.endDate.toISOString() : null;
            $scope.asset.tasks.push({ // Add object to patents array
                'taskTitle': $scope.newTask.taskTitle,
                'description': $scope.newTask.description,
                'ownerId': ownerId,
                'startDate': startDate,
                'endDate': endDate,
                'status': $scope.newTask.status
            });
            $scope.asset.$save() // update asset with added patent
                .then(function() {
                    $scope.newTask = {}; // clear 'newPatent'
                    $scope.today();
                });
        };
        // Title, Description, owner, creation-date, finish-date, status





    });
