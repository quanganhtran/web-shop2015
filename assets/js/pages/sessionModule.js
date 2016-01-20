/**
 * TODO: should it be deleted maybe?
 *
 * Created by Anh on 12/9/2015.
 */
var app = angular.module('SessionModule', ['toastr', 'compareTo', 'ngCookies']);

app.controller('SessionController', ['$scope', '$http', '$cookies', 'toastr', function($scope, $http, $cookies, toastr) {

  //$http.put('/login', function() {
  //
  //});

  $scope.submitLoginForm = function (){
    // Set the loading state (i.e. show loading spinner)
    $scope.loginForm.loading = true;
    // Submit request to Sails.
    $http.put('/login', {
        username: $scope.loginForm.username,
        password: $scope.loginForm.password
      })
      .then(function onSuccess(user) {
        // Refresh the page now that we've been logged in.
        window.location = '/';
      })
      .catch(function onError(sailsResponse) {
        // Handle known error type(s).
        // Invalid username / password combination.
        if (sailsResponse.status === 400 || 404) {
          toastr.error('Invalid username/password combination.', 'Error', {
            closeButton: true
          });
          return;
        }
        toastr.error('An unexpected error occurred, please try again.', 'Error', {
          closeButton: true
        });
        return;
      })
      .finally(function eitherWay(){
        $scope.loginForm.loading = false;
      });
  };



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
}]);
