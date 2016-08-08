'use strict';

/* Services */

var simpleAppServices = angular.module('simpleAppServices', ['ngResource']);

simpleAppServices.factory('Employee', function ($resource, $http) {
    var urlBase = 'http://localhost:8080/employee'; //get?model=userDetail&userid=123123123;
    return {
        getEmployee: function () {
            return $http({
                url: urlBase + '/getAll',
                method: "GET"
            })
        }
    }
});

simpleAppServices.factory('District', function ($resource, $http) {
    var urlBase = 'http://localhost:8080/district'; //get?model=userDetail&userid=123123123;
    return {
        getDistrict: function () {
            return $http({
                url: urlBase + '/getAll',
                method: "GET"
            })
        }
    }
});