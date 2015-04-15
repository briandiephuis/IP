'use strict';

/**
 * @ngdoc function
 * @name tomTomApp.controller:NavbarTopLinksCtrl
 * @description
 * # NavbarTopLinksCtrl
 * Controller of the tomTomApp
 */
angular.module('tomTomApp')
    .controller('NavbarTopLinksCtrl', function($rootScope, $scope, $state, simpleLogin, FBURL, Firebase, $firebase, People, Ticket) {

        $scope.tickets = Ticket;
        $scope.people = People;

        $scope.messages = [];

        $scope.logout = function() {
            simpleLogin.logout();
            $state.go('login');
        };
        $scope.user = simpleLogin.getUser();

        simpleLogin.watch(update, $rootScope);

        function update(check) {
            $scope.user = check;
            // console.log(check);
            if (check.uid) {
                var ref = new Firebase(FBURL).child('users').child(check.uid);
                var u = $firebase(ref).$asObject();
                u.$loaded(function() {
                    var ref2 = new Firebase(FBURL).child('people').child(u.peopleId);
                    $scope.userPerson = $firebase(ref2).$asObject();
                    // console.log($scope.userPerson);
                });
            }
        }

    });
