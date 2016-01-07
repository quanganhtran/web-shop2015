/**
 * Created by pghoo on 04/01/2016.
 */
angular.module('AddItemModule').controller('AddItemController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  // set-up loading state
  $scope.addItemForm = {
    loading: false
  }

  $scope.submitAddItemForm = function() {
    $scope.addItemForm.loading = true;
    $http.post('/addItem', {
      name: $scope.addItemForm.name,
      price: $scope.addItemForm.price,
      // createdBy: req.session.me,
      description: $scope.addItemForm.description,
      imagePath: $scope.addItemForm.imagePath,
      manufacturedDate: $scope.addItemForm.manufacturedDate
    })
      .then(function onSuccess(sailsResponse){
        $('.form-control').val('');
        toastr.success('The item is added successfully.', 'Success', {
          closeButton: true
        });
        return;
      })
      .finally(function eitherWay(){
        $scope.addItemForm.loading = false;
      })
  };
}]);
