/**
 * Created by Anh on 12/9/2015.
 */
var app = angular.module('sessionModule', []);

app.controller('sessionController', function($scope, $http) {
  $scope.showForm = false;
  $http.post('/api/login').then(
    function (response) {$scope.status = response.data.username;},
    function (error) {$scope.showForm = true;}
  );
  $scope.login = function() {
    $http.post('/api/login', {username: $scope.username, password: $scope.password}).then(
      function (response) {
        $scope.status = response.data.username;
        $scope.showForm = false;
      },
      function (error) {
        console.log(error);
        $scope.status = error.data;
        $scope.showForm = true;
      }
    )
  }
});
