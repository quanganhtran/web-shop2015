angular.module('UsersModule', ['toastr']);

angular.element(document).ready(function() {
  var Module = document.getElementsByClassName("UsersModule");
  angular.bootstrap(Module, ["UsersModule"]);
});

angular.module('UsersModule').controller('UsersController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

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
