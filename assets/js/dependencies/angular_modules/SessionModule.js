/**
 * Created by Anh on 12/9/2015.
 */
var app = angular.module('SessionModule', ['ngCookies']);

app.controller('HeaderController', function ($scope, $http) {
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
    console.log(res);
    $scope.me = res.data;
  }, function (err) {
    console.log('You are not logged in.');
  });
  //SessionService.me(function(me){
  //  $scope.me = me;
  //});
});

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
    //login: function (user, cb, err_cb ) {
    //  // Submit request to Sails.
    //  $http.put('/login', {
    //      username: user.username,
    //      password: user.password
    //  }).then(function onSuccess(res) {
    //      cb(res);
    //  }, function onError(err) {
    //      err_cb(err);
    //  });
    //},
    //logout: function (cb, err_cb) {
    //  $http.get('/logout').then(function (res) {
    //    return cb(res);
    //  }, function (err) {
    //    return err_cb(err);
    //  });
    //}
  }
});
