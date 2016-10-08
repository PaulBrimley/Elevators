var app = angular.module('elevatorApp', []);

app.controller('mainControl', function ($scope) {
    $scope.floorQty = [];
    $scope.floorQtyInput = 3;
    $scope.elevatorQty = [];
    $scope.elevatorQtyInput = 2;

    $scope.peopleEnter = 0;
    $scope.peopleQty = 0;

    $scope.buildingObj = {};
    for (var i = 0; i < $scope.elevatorQtyInput; i++) {
        $scope.elevatorQty.push({i: i});
        $scope.buildingObj['elevator' + i] = {
            currentFloor: 2
        };
    }
    for (var i = 0; i < $scope.floorQtyInput; i++) {
        $scope.floorQty.push({i: i});
        for (var prop in $scope.buildingObj) {
            $scope.buildingObj[prop]['floor' + i] = {
                peopleQty: null,
                elevatorLoaded: false,
                floorDestination: null
            };
            if (i === $scope.floorQtyInput - 1) {
                $scope.buildingObj[prop]['floor' + i].elevatorHere = true;
            } else {
                $scope.buildingObj[prop]['floor' + i].elevatorHere = false;
            }
        }
    }
    $scope.loadPeople = function (floorIndex, elevatorIndex, peopleEnter) {

    };

    $scope.sendElevator = function (floorIndex, elevatorIndex, peopleEnter) {

    };

    $scope.summonElevator = function (floorIndex, elevatorIndex, peopleEnter) {
        console.log(floorIndex, elevatorIndex, peopleEnter);
        if (peopleEnter) {
            $scope.buildingObj['elevator' + elevatorIndex]['floor' + floorIndex].elevatorLoaded = true;
        } else {
            alert('Please enter a person quantity greater than 0.');
        }
    }
});

app.directive('elevator', function () {
    return {
        scope: {
            elevatorPosition: '='
        },
        templateUrl: '../views/elevator.html',
        link: function (scope, elem, attr) {
            console.log(scope.elevatorPosition);
        }
    }
});

app.directive('person', function () {
    return {
        scope: {

        },
        link: function (scope, elem, attr) {

        }
    }
});