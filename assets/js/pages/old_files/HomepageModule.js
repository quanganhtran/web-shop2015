var app = angular.module('HomepageModule', ['toastr', 'compareTo', 'IdentityModule']);

app.controller('HomepageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  console.log('called');

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
        // suspended user tries to login.
        console.log(sailsResponse.status);
        if (sailsResponse.status == 403) {
          toastr.error('Your account is suspended. Contact the admin for more info.', 'Error', {
            closeButton: true
          });
          return;
        } else

        // Invalid username / password combination.
        if (sailsResponse.status === 400 || 404) {
          // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
          //
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


}]);
