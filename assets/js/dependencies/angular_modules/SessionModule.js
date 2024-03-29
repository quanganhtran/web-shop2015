/**
 * Created by Anh on 12/9/2015.
 */
var app = angular.module('SessionModule', ['ngCookies', 'toastr']);

app.controller('HeaderController', ['$scope', '$http', 'toastr', function ($scope, $http, toastr) {
  // set-up loginForm loading state
  $scope.loginForm = {
    loading: false
  };
  $scope.submitLoginForm = function (){
    // Set the loading state (i.e. show loading spinner)
    $scope.loginForm.loading = true;
    // Submit request to Sails.
    $http.put('/login', {
        username: $scope.loginForm.username,
        password: $scope.loginForm.password
      })
      .then(function onSuccess (){
        // Refresh the page now that we've been logged in.
        window.location = '/';
      })
      .catch(function onError(sailsResponse) {
        // Handle known error type(s).
        // Invalid username / password combination.
        if (sailsResponse.status === 403) {
          toastr.error('You are suspended, contact admin for more info.', 'Error', {
            closeButton: true
          });
          return;
        }

        if (sailsResponse.status === 400 || 404) {
          toastr.error('Invalid username/password combination.', 'Error', {
            closeButton: true
          });
          return;
        }
        toastr.error('An unexpected error occurred, please try again.', 'Error', {
          closeButton: true
        });
      })
      .finally(function eitherWay(){
        $scope.loginForm.loading = false;
      });
  };
  $http.put('/login', {}).then(function (res) {
    //console.log(res);
    $scope.me = res.data;
  }, function (err) {
    console.log('You are not logged in.');
  });
}]);

app.controller('IdentityController', ['$scope', 'SessionService', function($scope, SessionService) {
  //$scope.me = window.SAILS_LOCALS.me;
  SessionService.me(function(res){
    $scope.me = res.data;
  });
}]);

app.factory('SessionService', function ($http) {
  return {
    me: function (cb, err_cb) {
      $http.put('/login', {}).then(function (res) {
        cb(res);
      }, function (err) {
        cb_err(err);
      });
    }
  }
});
