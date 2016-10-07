var app = angular.module('elevatorApp', []);

app.controller('mainControl', function ($scope) {
    $scope.floorQty = 3;
    $scope.elevatorQtyInput = 2;
    $scope.elevatorQty = [];
    for (var i = 0; i <= $scope.elevatorQtyInput; i++) {
        $scope.elevatorQty.push({i: i});
    }

    $scope.elevatorWidth = $('body').width() / ((2 * $scope.elevatorQtyInput) + 1);
    $scope.peopleQty = 0;

    // console.log($('body').width());
});

app.directive('elevator', function () {
    return {
        scope: {
            elevatorWidth: '='
        },
        templateUrl: '../views/elevator.html',
        link: function (scope, elem, attr) {
            console.log(scope.elevatorWidth);
            elem.css('width', scope.elevatorWidth);
        }
    }
});