/**
 * Created by pghoo on 19/01/2016.
 */
var app = angular.module('myOrderModule', ['SessionModule']);

app.controller('myOrderController', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/order').then(function (response) {
    $scope.orders = response.data;
  });
  $http.get('/api/orderDetail').then(function (response) {
    $scope.orderDetails = response.data;
  });
}]);
