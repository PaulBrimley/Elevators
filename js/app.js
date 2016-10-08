var app = angular.module('elevatorApp', []);

app.controller('mainControl', function ($scope, $timeout) {

    $scope.elevatorQtyInput = 20;
    $scope.floorQtyInput = 5;



    $scope.buildingHeight = 0;
    $scope.floorQty = [];
    $scope.elevatorQty = [];
    $scope.peopleEnter = 0;
    $scope.peopleQty = 0;
    $scope.personCounter = 0;
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
    $scope.loadPeople = function (floorIndex) {
        if ($scope.buildingObj.floors['floor' + floorIndex].peopleQty) {
            console.log($scope.buildingObj.floors['floor' + floorIndex].elevators);
            for (var i = 0; i < $scope.buildingObj.floors['floor' + floorIndex].peopleQty; i++) {
                $scope.buildingObj.elevators[$scope.buildingObj.floors['floor' + floorIndex].elevators[0]].people.push({
                    personId: 'person' +  $scope.personCounter
                });
                $scope.personCounter++;
            }

            $scope.buildingObj.floors['floor' + floorIndex].elevatorLoaded = true;
        } else {
            alert('Please enter a person quantity greater than 0.');
        }
    };

    $scope.sendElevator = function (floorIndex) {
        if ($scope.buildingObj.floors['floor' + floorIndex].floorDestination && $scope.buildingObj.floors['floor' + floorIndex].floorDestination >= 1 && $scope.buildingObj.floors['floor' + floorIndex].floorDestination <= $scope.floorQtyInput) {
            var elevatorSent = '';
            $scope.buildingObj.elevators[$scope.buildingObj.floors['floor' + floorIndex].elevators[0]].direction = $scope.buildingObj.elevators[$scope.buildingObj.floors['floor' + floorIndex].elevators[0]].currentFloor < $scope.floorQtyInput -  $scope.buildingObj.floors['floor' + floorIndex].floorDestination ? 'down' : 'up';
            $scope.buildingObj.elevators[$scope.buildingObj.floors['floor' + floorIndex].elevators[0]].currentFloor = $scope.floorQtyInput -  $scope.buildingObj.floors['floor' + floorIndex].floorDestination;
            console.log($scope.floorQtyInput -  $scope.buildingObj.floors['floor' + floorIndex].floorDestination);
            console.log($scope.buildingObj.floors['floor' + ($scope.floorQtyInput -  $scope.buildingObj.floors['floor' + floorIndex].floorDestination)]);
            elevatorSent = $scope.buildingObj.floors['floor' + floorIndex].elevators[0];

            $scope.buildingObj.floors['floor' + ($scope.floorQtyInput -  $scope.buildingObj.floors['floor' + floorIndex].floorDestination)].elevators.push(elevatorSent);
            $scope.buildingObj.floors['floor' + floorIndex].peopleQty = null;
            $scope.buildingObj.floors['floor' + floorIndex].floorDestination = null;
            for (var i = $scope.buildingObj.floors['floor' + floorIndex].elevators.length - 1; i >= 0; i--) {
                if ($scope.buildingObj.floors['floor' + floorIndex].elevators[i] === elevatorSent) {
                    console.log('splicing');
                    $scope.buildingObj.floors['floor' + floorIndex].elevators.splice(i, 1);
                }
            }
            for (var prop in $scope.buildingObj.floors) {
                if ($scope.buildingObj.floors[prop].elevators.length === 0) {
                    $scope.buildingObj.floors[prop].elevatorHere = false;
                    $scope.buildingObj.floors[prop].elevatorLoaded = false;
                } else {
                    $scope.buildingObj.floors[prop].elevatorHere = true;
                    $scope.buildingObj.floors[prop].elevatorLoaded = false;
                }
            }

        } else {
            alert('Please enter a valid floor destination.');
        }
    };

    $scope.summonElevator = function (floorIndex) {
        //Here I would check for which elevator was the closest and add that into the if statement below to grab the closest elevator
        for (var prop in $scope.buildingObj.elevators) {
            if ($scope.buildingObj.elevators[prop].people.length === 0 && $scope.buildingObj.elevators[prop].tripCounter < 100) {
                console.log('here');
                for (var i = $scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators.length - 1; i >= 0; i--) {
                    if ($scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators[i] === $scope.buildingObj.elevators[prop].elevatorId) {
                        console.log('splicing', $scope.buildingObj.elevators[prop].elevatorId);
                        $scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators.splice(i, 1);
                        console.log($scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators)
                    }
                }
                $scope.buildingObj.elevators[prop].direction = $scope.buildingObj.elevators[prop].currentFloor < floorIndex ? 'down' : 'up';
                    $scope.buildingObj.elevators[prop].tripCounter++;
                $scope.buildingObj.elevators[prop].currentFloor = floorIndex;
                $scope.buildingObj.floors['floor' + floorIndex].elevators.push($scope.buildingObj.elevators[prop].elevatorId);
                break;
            } else if (($scope.buildingObj.elevators[prop].direction === 'down' && $scope.buildingObj.elevators[prop].destinationFloor <= floorIndex) || ($scope.buildingObj.elevators[prop].direction === 'up' && $scope.buildingObj.elevators[prop].destinationFloor >= floorIndex) && $scope.buildingObj.elevators[prop].tripCounter < 100) {
                for (var i = $scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators.length - 1; i >= 0; i--) {
                    if ($scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators[i] === $scope.buildingObj.elevators[prop].elevatorId) {
                        console.log('splicing', $scope.buildingObj.elevators[prop].elevatorId);
                        $scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators.splice(i, 1);
                        console.log($scope.buildingObj.floors['floor' + $scope.buildingObj.elevators[prop].currentFloor].elevators)
                    }
                }
                $scope.buildingObj.elevators[prop].direction = $scope.buildingObj.elevators[prop].currentFloor < floorIndex ? 'down' : 'up';
                $scope.buildingObj.elevators[prop].currentFloor = floorIndex;
                $scope.buildingObj.elevators[prop].tripCounter++;
                $scope.buildingObj.floors['floor' + floorIndex].elevators.push($scope.buildingObj.elevators[prop].elevatorId);
                break;
            }
        }
        for (var prop in $scope.buildingObj.floors) {
            if ($scope.buildingObj.floors[prop].elevators.length === 0) {
                $scope.buildingObj.floors[prop].elevatorHere = false;
            } else {
                $scope.buildingObj.floors[prop].elevatorHere = true;
            }
        }
    }

    $scope.$on('elevatorArrived', function (data) {
        for (var prop in $scope.buildingObj.floors) {
            if ($scope.buildingObj.floors[prop].elevators.length === 0) {
                $scope.buildingObj.floors[prop].elevatorHere = false;
            } else {
                $scope.buildingObj.floors[prop].elevatorHere = true;
            }
        }
    })
});

app.directive('elevator', function ($rootScope) {
    return {
        scope: {
            buildingHeight: '=',
            elevatorId: '=',
            elevatorPosition: '=',
            floorQty: '=',
            people: '='
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
                console.log(newVal);
               if (scope.buildingHeight && scope.floorQty) {
                   var height = scope.buildingHeight / scope.floorQty;
                   elem.stop();
                   elem.animate({top: newVal * height}, 2000, function () {
                       $rootScope.$broadcast('elevatorArrived', scope.elevatorId);
                       scope.people = [];
                       scope.$apply();
                   });
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