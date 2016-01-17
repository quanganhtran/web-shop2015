/**
 * Created by Anh on 1/17/2016.
 */
var app = angular.module('ItemListModule', []);

app.controller('ItemListController', function($scope, $http) {
  $http.get('/api/item').then(function (res) {$scope.items = res.data;});
});
