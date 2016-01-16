/**
 * Created by Anh on 12/9/2015.
 */
var app = angular.module('homepage', ['sessionModule']);

app.controller('itemListController', function($scope, $http) {
  $http.get('/api/item').then(function (response) {
    $scope.items = response.data;
  });
});
