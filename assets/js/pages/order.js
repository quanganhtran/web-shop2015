var app = angular.module('OrderModule',['SessionModule']);

app.controller('OrderController', function($scope, $http) {
  $scope.order = window.SAILS_LOCALS.order
});
