'use strict';

var simpleAppControllers = angular.module('simpleAppControllers', []);
simpleAppControllers.run(function ($rootScope, $route) {
    $rootScope.dateFormat = 'dd-MMMM-yyyy';
    $rootScope.employee = {};
})
    .controller('inputController', ['$scope', '$rootScope', 'Employee','saveEmployee', 'District',
        function ($scope, $rootScope, Employee, saveEmployee, District) {
            $scope.title = "input";

            $scope.genderData = [
                { name: 'Pria', value: "L" },
                { name: 'Wanita', value: "P" }
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
                { districtName: 'Bandung', districtCode: "D" }
            ];



            // $scope.searchEmployees = [
            //     "Asep"
            // ];

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
                { field: "employeeName", title: "Nama" },
                { field: "birthDate", type: "date", title: "Tanggal Lahir" },
                { field: "gender", title: "Tanggal Lahir" },
                { field: "joinDate", title: "Tanggal Masuk" },
                { field: "employeeAddress", title: "Alamat" }
            ];
            $scope.onChange = function (data) {
                $scope.selected = data;
                // console.log(moment($scope.selected.joinDate).format("DD-MM-YYYY"));
            };

            // $scope.selectedDistrict = function (data) {
            //     console.log($scope.district.dataTextField);
            //     $scope.employee.districtName = data.districtName;
            //     $scope.employee.districtCode = data.districtCode;
            //     // console.log(moment($scope.selected.joinDate).format("DD-MM-YYYY"));
            // };

            // $scope.districtOptions = {
            //     placeholder: "'Select...'",
            //     dataTextField: 'districtName',
            //     dataValueField: 'districtCode',
            //     dataSource: {
            //         data: $scope.districtData
            //     }
            // }
            $scope.districtDataSource = [
                { districtName: 'Bandung', districtCode: "D" }
            ]


            Employee.getAll().then(function success(data) {
                $scope.gridData = data.data;
                var names = [];
                angular.forEach($scope.gridData, function (value) {
                    this.push(value.employeeName);
                }, names);
                $scope.searchEmployees = names;
                console.log(names);
            }, function error(error) {
                console.log(error);
            });


            // District.getAll().then(function success(data) {
            //     $scope.districtOptions.dataSource.data = data.data;
            //     console.log($scope.districtOptions.dataSource.data);
            // }, function error(error) {
            //     console.log(error);
            // });

            // District.getAll().then(function success(data) {
            //     $scope.districtOptions.dataSource.data = data.data;
            // //     var dis = [];
            // //     angular.forEach(data.data,function(value, key){
            // //         this.push('{districtName :\''+ value.districtName +'\', districtCode:\'' + value.districtCode +'\'}');
            // //     },dis);
            // //     $scope.districtOptions.dataSource.data = dis;
            //      console.log($scope.districtOptions.dataSource.data);
            // }, function error(error) {
            //     console.log(error);
            // });


            // $scope.selectEmployee = function (employee) {
            //     $rootScope.selectedEmployee = Employee;
            // };
            $scope.createEmployee = function (employee) {
                
                //$scope.employee = new Employee();
                // $scope.employee.employeeName = employee.employeeName;
                // $scope.employee.employeeAddress = employee.employeeAddress;
                // $scope.employee.bornDate = employee.bornDate;
                // $scope.employee.joinDate = employee.joinDate;
                // console.log(employee.employeeName);
                console.log(employee.birthDate);
                employee.birthDate = kendo.parseDate(employee.birthDate, "yyyy-mm-dd");
                console.log(employee.birthDate);
                $scope.json = angular.toJson(employee);
                console.log($scope.json);
                Employee.save($scope.json);
            };

        }]);
