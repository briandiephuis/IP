'use strict';

/**
 * @ngdoc filter
 * @name tomTomApp.filter:lang
 * @function
 * @description
 * # lang
 * Filter in the tomTomApp.
 */
angular.module('tomTomApp')
    .filter('lang', function() {
        return function(input, lang) {
        	var r = [];
            if (Object.prototype.toString.call(input) === '[object Array]') {
                // input is an array
                for (var i = input.length - 1; i >= 0; i--) {
                    if (input[i]['@lang'] === lang) {

                        // language is found, are there sub paragraphs?
                        if (!input[i].p) {
                            return input[i].$; // return string
                        } else if (Object.prototype.toString.call(input[i].p) === '[object Array]') {
                            for (var j = input[i].p.length - 1; j >= 0; j--) {
                                r.push(input[i].p[j].$);
                            }
                            return r; // return paragraphs as array
                        } else {
                            return [input[i].p.$]; // return paragraph as array
                        }

                    }
                }
                return input[1].$; // Language not foud, return the first language
            } else {
                if (input === undefined) {
                    return input;
                } else if (input.p) {

                    if (Object.prototype.toString.call(input.p) === '[object Array]') {
                        for (var k = input.p.length - 1; k >= 0; k--) {
                            r.push(input.p[k].$);
                        }
                        return r; // return paragraphs as array
                    } else {
                        return [input.p.$]; // return paragraph as array
                    }

                } else {
                    if (input['@lang']) {
                        return input.$;
                    }
                }
            }
        };
    });
