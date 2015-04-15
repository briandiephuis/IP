'use strict';
/**
 * @ngdoc function
 * @name tomTomApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('tomTomApp')
  .controller('LoginCtrl', function ($scope, simpleLogin, $state) {
    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      simpleLogin.passwordLogin({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };

    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        simpleLogin.createAccount(email, pass, {rememberMe: true})
          .then(redirect, showError);
      }
    };
    

    function redirect() {
      $state.go('planning.dashboard');
    }

    function showError(err) {
      $scope.err = err;
    }


    $scope.fillLogin = function (name) {
      if(name==='Anouk') {
        $scope.email = 'anouk@tomtom.nl';
        $scope.pass = 'asdf';
      } else if(name==='Roy') {
        $scope.email = 'roy@tomtom.nl';
        $scope.pass = 'asdf';
      }
    };

  });
