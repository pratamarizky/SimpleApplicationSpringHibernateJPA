'use strict';

var simpleAppControllers = angular.module('simpleAppControllers', []);
simpleAppControllers.run(function ($rootScope, $route) {
    $rootScope.dateFormat = 'dd-MMMM-yyyy';
    $rootScope.employee = {};
})
    .controller('inputController', ['$scope', '$rootScope', 'Employee', 'District',
        function ($scope, $rootScope, Employee, District) {
            $scope.title = "input";

            $scope.genderData = [
                { name: 'Pria', value: "L" },
                { name: 'Wanita', value: "P" }
            ];

            $scope.genderOptions = {
                placeholder: "Pilih Jenis Kelamin",
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

            // $scope.gridData = [
            //     {
            //         name: "Asep",
            //         bornDate: "1988-10-21T13:28:06.419Z",
            //         gender: "Pria",
            //         joinDate: "1988-10-21T13:28:06.419Z",
            //         address: "Bandung"
            //     },
            //     {
            //         name: "Hasna",
            //         bornDate: "1988-10-21T13:28:06.419Z",
            //         gender: "Wanita",
            //         joinDate: "1988-10-21T13:28:06.419Z",
            //         address: "Bandung"
            //     },
            //     {
            //         name: "Irma",
            //         bornDate: "1988-10-21T13:28:06.419Z",
            //         gender: "Wanita",
            //         joinDate: "1988-10-21T13:28:06.419Z",
            //         address: "Bandung"
            //     }
            // ];

            $scope.gridColumns = [
                { field: "employeeName", title: "Nama" },
                { field: "birthDate", type: "date", title: "Tanggal Lahir" },
                { field: "gender", title: "Jenis Kelamin" },
                { field: "joinDate", title: "Tanggal Masuk" },
                { field: "employeeAddress", title: "Alamat" }
            ];
            $scope.onChange = function (data) {
                $scope.selected = data;
                console.log($scope.selected);
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

            // $scope.districtDataSource = [
            //     // { districtName: 'Bandung', districtCode: "D" }

            // ]


            Employee.getAll().then(function success(data) {
                $scope.gridData = data.data;
                var names = [];
                angular.forEach($scope.gridData, function (value) {
                    this.push(value.employeeName, value.employeeAddress);
                }, names);
                var names2 = [];
                var i, j, unique;
                var l = names.length;
                for (i = 0; i < l; i++) {
                    unique = true;
                    if (names2.length != 0)
                        for (j = 0; j < names2.length; j++) {
                            if (names[i] == names2[j])
                                unique = false;
                        }

                    if (unique) {
                        names2.push(names[i]);
                    }
                }
                $scope.searchEmployees = names2;
                console.log(names2);
            }, function error(error) {
                console.log(error);
            });


            District.getAll().then(function success(data) {
                $scope.districtDataSource = data.data;
                console.log($scope.districtDataSource);
            }, function error(error) {
                console.log(error);
            });

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
                // employee.birthDate = kendo.parseDate(employee.birthDate, "yyyy-mm-dd");
                console.log(employee.birthDate);
                $scope.json = angular.toJson(employee);
                console.log($scope.json);
                Employee.save($scope.json).success(function () {
                    Employee.getAll().then(function success(data) {
                        $scope.gridData = data.data;
                        // $scope.gridData.read();
                    }, function error(error) {
                        console.log(error);
                    });
                });
            };

            $scope.deleteEmployee = function () {
                var employee = {};
                var district = {};
                console.log($scope.selected.district.districtCode);
                employee.employeeName = $scope.selected.employeeName;
                employee.employeeCode = $scope.selected.employeeCode;
                employee.gender = $scope.selected.gender;
                district.districtCode = $scope.selected.district.districtCode;
                district.districtName = $scope.selected.district.districtName;
                employee.district = district;
                employee.birthDate = kendo.parseDate($scope.selected.birthDate, "yyyy-mm-dd");
                employee.joinDate = kendo.parseDate($scope.selected.joinDate, "yyyy-mm-dd");
                $scope.json = angular.toJson(employee);
                Employee.delete($scope.json).success(function () {
                    Employee.getAll().then(function success(data) {
                        $scope.gridData = data.data;
                        // $scope.gridData.read();
                    }, function error(error) {
                        console.log(error);
                    });
                });
            }

            $scope.searchValue = function () {
                // $scope.searchEmp = data;
                console.log($scope.searchEmp);
                // console.log(moment($scope.selected.joinDate).format("DD-MM-YYYY"));
                if ($scope.searchEmp == "") {
                    Employee.getAll().then(function success(data) {
                        $scope.gridData = data.data;
                        // $scope.gridData.read();
                    }, function error(error) {
                        console.log(error);
                    });
                }
                else {
                    Employee.searchEmployee($scope.searchEmp).then(function success(data) {
                        $scope.gridData = data.data;
                    }, function error(error) {
                        console.log(error);
                    });
                }

            };;

        }]);
