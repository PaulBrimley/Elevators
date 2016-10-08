var app = angular.module('elevatorApp', []);

app.controller('mainControl', function ($scope, $timeout) {
    $scope.buildingHeight = 0;
    $scope.floorQty = [];
    $scope.floorQtyInput = 3;
    $scope.elevatorQty = [];
    $scope.elevatorQtyInput = 2;

    $scope.peopleEnter = 0;
    $scope.peopleQty = 0;

    $scope.buildingObj = {
        elevators: {},
        floors: {}
    };
    for (var i = 0; i < $scope.elevatorQtyInput; i++) {
        $scope.elevatorQty.push({i: i});
        $scope.buildingObj.elevators['elevator' + i] = {
            currentFloor: $scope.floorQtyInput - 1,
            elevatorId: 'elevator' + i,
            people: [],
            destinationFloor: null,
            direction: null,
            tripCounter: 0
        };
    }
    for (var i = 0; i < $scope.floorQtyInput; i++) {
        $scope.floorQty.push({i: i});
        $scope.buildingObj.floors['floor' + i] = {
            peopleQty: null,
            elevators: [],
            floorDestination: null,
            people: [],
            elevatorLoaded: false
        };
        $scope.buildingObj.floors['floor' + i].elevators.push();
        if (i === $scope.floorQtyInput - 1) {
            $scope.buildingObj.floors['floor' + i].elevatorHere = true;
        } else {
            $scope.buildingObj.floors['floor' + i].elevatorHere = false;
        }
    }
    for (var prop in $scope.buildingObj.elevators) {
        $scope.buildingObj.floors['floor' + ($scope.floorQtyInput - 1)].elevators.push($scope.buildingObj.elevators[prop].elevatorId);
    }
    $timeout(function () {
       $scope.buildingHeight = $('.floorHolder').height();
    });
    $scope.loadPeople = function (floorIndex, elevatorIndex, peopleEnter) {
        if (peopleEnter) {
            $scope.buildingObj['elevator' + elevatorIndex]['floor' + floorIndex].people.push({

            });
            $scope.buildingObj['elevator' + elevatorIndex]['floor' + floorIndex].elevatorLoaded = true;
        } else {
            alert('Please enter a person quantity greater than 0.');
        }
    };

    $scope.sendElevator = function (floorIndex, elevatorIndex, peopleEnter) {

    };

    $scope.summonElevator = function (floorIndex) {
        for (var prop in $scope.buildingObj.elevators) {
            if ($scope.buildingObj.elevators[prop].people.length === 0) {
                console.log($scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators);
                for (var i = $scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators.length - 1; i >= 0; i--) {
                    if ($scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators[i] === $scope.buildingObj.elevators[prop].elevatorId) {
                        console.log('splicing', $scope.buildingObj.elevators[prop].elevatorId);
                        $scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators.splice(i, 1);
                        console.log($scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators)
                    }
                }

                $scope.buildingObj.elevators[prop].currentFloor = floorIndex;
            } else if (($scope.buildingObj.elevators[prop].direction === 'down' && $scope.buildingObj.elevators[prop].destinationFloor >= floorIndex) || ($scope.buildingObj.elevators[prop].direction === 'up' && $scope.buildingObj.elevators[prop].destinationFloor <= floorIndex)) {
                $scope.buildingObj.elevators[prop].currentFloor = floorIndex;
            }
            $scope.buildingObj.floors['floor' + floorIndex].elevators.push($scope.buildingObj.elevators[prop].elevatorId);
            break;
        }
        for (var prop in $scope.buildingObj.floors) {
            console.log(prop, $scope.buildingObj.floors[prop].elevators.length);
            if ($scope.buildingObj.floors[prop].elevators.length === 0) {
                console.log('here', prop);
                $scope.buildingObj.floors[prop].elevatorHere = false;
            } else {
                $scope.buildingObj.floors[prop].elevatorHere = true;
            }
        }
    }
});

app.directive('elevator', function () {
    return {
        scope: {
            buildingHeight: '=',
            elevatorPosition: '=',
            floorQty: '='
        },
        templateUrl: '../views/elevator.html',
        link: function (scope, elem, attr) {


            scope.$watch('buildingHeight', function (newVal, oldVal) {
                if (newVal && scope.floorQty) {
                    var height = newVal / scope.floorQty;
                    elem.css({height: height + 'px', top: scope.elevatorPosition * height});
                }
            });
            scope.$watch('floorQty', function (newVal, oldVal) {
                if (newVal && scope.buildingHeight) {
                    var height = scope.buildingHeight / newVal;
                    elem.css({height: height + 'px', top: scope.elevatorPosition * height});
                }
            });
            scope.$watch('elevatorPosition', function (newVal, oldVal) {
               if (scope.buildingHeight && scope.floorQty) {
                   var height = scope.buildingHeight / scope.floorQty;
                   elem.css({top: newVal * height});
               }
            });
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