'use strict';

/* Services */

var simpleAppServices = angular.module('simpleAppServices', []);

simpleAppServices.factory('Employee', ['$resource', '$http',
    function ($resource, $http) {
        var urlBase = 'http://localhost:8080/employee'; //get?model=userDetail&userid=123123123;
        return {
            getEmployee: function () {
                return $http({
                    url: urlBase + '/getAll',
                    method: "GET"
                })
            }
        }
        //alert("masuk");
    }]);

simpleAppServices.factory('District',['$resource','$http',
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