/**
 * Created by pghoo on 04/01/2016.
 */
var app = angular.module('SignupModule', ['toastr', 'compareTo', 'SessionModule']);

app.controller('SignupController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  // set-up loading state
  $scope.signupForm = {
    loading: false
  };

  $scope.submitSignupForm = function() {
    $scope.signupForm.loading = true;
    $http.post('/signup', {
        name: $scope.signupForm.name,
        username: $scope.signupForm.username,
        email: $scope.signupForm.email,
        password: $scope.signupForm.password,
        address: $scope.signupForm.address,
        phone: $scope.signupForm.phone,
        isApplyingForMerchant: $scope.signupForm.isApplyingForMerchant
      })
      .then(function onSuccess(sailsResponse){
        window.location = '/';
      })
      .catch(function onError(sailsResponse){
        // Handle known error type(s).
        console.log('signup module catch');
        console.log('signup module says ', sailsResponse.status);
        console.log(sailsResponse.status);

        var emailAddressAlreadyInUse = sailsResponse.status == 409;
        if (emailAddressAlreadyInUse) {
          toastr.error('That email address has already been taken, please try again.', 'Error', {
            closeButton: true
          });
          return;
        }

        var usernameAlreadyInUse = sailsResponse.status == 418;
        if (usernameAlreadyInUse) {
          toastr.error('That username has already been taken, please try again.', 'Error', {
            closeButton: true
          });
          return;
        }

        var notValidEmail = sailsResponse.status == 419;
        if (notValidEmail) {
          toastr.error('The email address is not valid, please try again.', 'Error', {
            closeButton: true
          });
        }
      })
      .finally(function eitherWay(){
        $scope.signupForm.loading = false;
      })
  };
}]);
