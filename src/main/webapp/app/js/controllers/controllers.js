'use strict';

var simpleAppControllers = angular.module('simpleAppControllers', ['simpleAppServices']);
simpleAppControllers.run(function ($rootScope, $route) {
    $rootScope.selectedEmployee = {};
})
    .controller('inputController',['$scope', '$rootScope', 'Employee',
    function ($scope, $rootScope, Employee) {
        $scope.title = "input";

        $scope.genderData = [
            { name: 'Pria', value: 1 },
            { name: 'Wanita', value: 2 }
        ];

        $scope.genderOptions = {
            placeholder: "'Select...'",
            dataTextField: 'name',
            dataValueField: 'value',
            dataSource: {
                data: $scope.genderData
            }
        }

        $scope.districtData = [
            { name: 'Andir', value: 1 },
            { name: 'Cicendo', value: 2 }
        ];

        $scope.districtOptions = {
            placeholder: "'Select...'",
            dataTextField: 'name',
            dataValueField: 'value',
            dataSource: {
                data: $scope.districtData
            }
        }

        $scope.searchEmployees = [
            "Asep"
        ];

        $scope.gridData = [
            {
                name: "Asep",
                bornDate: "1988-10-21T13:28:06.419Z",
                gender: "Pria",
                joinDate: "1988-10-21T13:28:06.419Z",
                address: "Bandung"

            },
            {
                name: "Hasna",
                bornDate: "1988-10-21T13:28:06.419Z",
                gender: "Wanita",
                joinDate: "1988-10-21T13:28:06.419Z",
                address: "Bandung"
            },
            {
                name: "Irma",
                bornDate: "1988-10-21T13:28:06.419Z",
                gender: "Wanita",
                joinDate: "1988-10-21T13:28:06.419Z",
                address: "Bandung"
            }
        ];

        $scope.gridColumns = [
            { field: "name", title: "Nama" },
            { field: "bornDate", title: "Tanggal Lahir" },
            { field: "gender", title: "Tanggal Lahir" },
            { field: "joinDate", title: "Tanggal Masuk" },
            { field: "address", title: "Alamat" }
        ];
        $scope.onChange = function (data) {
            $scope.selected = data;
        };

        // Employee.getAll().then(function success(data) {
        //     $scope.gridData = data.data;
        // }, function error(error) {
        //     console.log(error);
        // });

        // $scope.selectEmployee = function (employee) {
        //     $rootScope.selectedEmployee = Employee;
        // };

    }]);
