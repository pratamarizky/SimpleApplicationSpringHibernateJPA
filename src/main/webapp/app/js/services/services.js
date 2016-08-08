'use strict';

/* Services */

var simpleAppServices = angular.module('simpleAppServices', ['ngResource']);

simpleAppServices.factory('Employee', ['$resource', '$http',
    function ($resource, $http) {
        var urlBase = 'http://localhost:8080/employee'; //get?model=userDetail&userid=123123123;
        return {
            getAll: function () {
                return $http({
                    url: urlBase + '/getAll',
                    method: "GET"
                })
            }
        }
    }]);

simpleAppServices.factory('District', ['$resource', '$http',
    function ($resource, $http) {
        var urlBase = 'http://localhost:8080/district'; //get?model=userDetail&userid=123123123;
        return {
            getDistrict: function () {
                return $http({
                    url: urlBase + '/getAll',
                    method: "GET"
                })
            }
        }
    }]);