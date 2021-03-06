'use strict';

/**
 * @ngdoc overview
 * @name tomTomApp
 * @description
 * # tomTomApp
 *
 * Main module of the application.
 */
angular.module('tomTomApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase',
        'firebase.utils',
        'simpleLogin',
        'ui.bootstrap',
        'ui.router',
        'smart-table',
        'ngLodash',
        'datamaps'
    ]);
    // .config(function($httpProvider) {
    //     delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // });
