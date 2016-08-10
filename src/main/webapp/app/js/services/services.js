'use strict';

/* Services */

var simpleAppServices = angular.module('simpleAppServices', ['ngResource']);
var basePathUrl = "http://172.16.16.47:8080";
simpleAppServices.factory('Employee', ['$resource', '$rootScope', '$http',
    function ($resource, $rootScope, $http) {
         
        var urlBase = basePathUrl +'/employee'; //get?model=userDetail&userid=123123123;
        // var urlBase = 'http://localhost:8080/employee';
        return {
            getAll: function () {
                return $http({
                    url: urlBase + '/getAll',
                    method: "GET"
                })
            },
            save: function (data) {
                return $http({
                    url: urlBase + '/save',
                    method: "POST",
                    'Content-Type':'application/json',
                    data : data
                })
            },
            delete: function (data){
                return $http({
                    url: urlBase + '/delete',
                    method: "POST",
                    'Content-Type':'application/json',
                    data : data
                })
            }

        }
    }]);

// simpleAppServices.factory('saveEmployee', ['$resource', '$rootScope', '$http',
//     function ($resource, $rootScope, $http) {
//         return $resource(
//             basePathUrl+'/employee/:id',
//             { id: '@employeeCode' },//Handy for update & delete. id will be set with id of instance
//             {
//                 update: {
//                     method: 'POST' // To send the HTTP Put request when calling this custom update method.
//                 }
//             }
//         );
//     }]);


simpleAppServices.factory('District', ['$resource', '$http',
    function ($resource, $http) {
        var urlBase = basePathUrl+'/district'; //get?model=userDetail&userid=123123123;
        // var urlBase = 'http://localhost:8080/employee';
        return {
            getAll: function () {
                return $http({
                    url: urlBase + '/getAll',
                    method: "GET"
                })
            }
        }
    }]);

