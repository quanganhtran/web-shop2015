/**
 * Created by pghoo on 04/01/2016.
 */
angular.module('EditModule').controller('EditController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  // set-up loading state
  $scope.editForm = {
    loading: false
  }

  $scope.submitEditForm = function() {
    $scope.editForm.loading = true;

    $http.post('/user/edit', {
        email: $scope.editForm.email,
        password: $scope.editForm.password,
        name: $scope.editForm.name,
        address: $scope.editForm.address,
        phone: $scope.editForm.phone
      })
      .then(function onSuccess(sailsResponse){
        window.location = '/profile';
      })
      .catch(function onError(sailsResponse){
        // Handle known error type(s).
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
          return;
        }
      })
      .finally(function eitherWay(){
        $scope.editForm.loading = false;
      })
  };
}]);
