/**
 * Created by pghoo on 04/01/2016.
 */
angular.module('AddItemModule', ['toastr', 'SessionModule', 'bootstrap.fileField']);

angular.element(document).ready(function () {
  var Module = document.getElementsByClassName("AddItemModule");
  angular.bootstrap(Module, ["AddItemModule"]);
});

angular.module('AddItemModule').controller('AddItemController', ['$scope', '$http', 'toastr',
  function ($scope, $http, toastr) {

    // set-up loading state
    $scope.addItemForm = {
      loading: false
    }

    $scope.submitAddItemForm = function () {
      $scope.addItemForm.loading = true;

      if ($scope.addItemForm.uploadFile) {
        console.log('There is a file');
        var fd = new FormData();
        fd.append('name', $scope.addItemForm.name);
        fd.append('price', $scope.addItemForm.price);
        fd.append('description', $scope.addItemForm.description);
        fd.append('manufacturedDate', $scope.addItemForm.manufacturedDate);
        fd.append('uploadFile', $scope.addItemForm.uploadFile);

        console.log(fd);

        $http.post('/addItem', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          })
          .then(function onSuccess(sailsResponse) {
              $('.add').val('');
              $scope.previewImage = "";
              toastr.success('The item is added successfully.', 'Success', {
                closeButton: true
              });
              return;
            },
            function onError(sailsResponse) {
              $('.add').val('');
              $scope.previewImage = "";
              toastr.error('The item failed in submission.', 'Error', {
                closeButton: true
              });
            }
          )
          .finally(function eitherWay() {
            $scope.addItemForm.loading = false;
          })
      } else {
        console.log('There is NNNNNOOOOOO file');
        $http.post('/addItem', {
          name: $scope.addItemForm.name,
          price: $scope.addItemForm.price,
          description: $scope.addItemForm.description,
          manufacturedDate: $scope.addItemForm.manufacturedDate
        }).then(function onSuccess(sailsResponse) {
            $('.add').val('');
            $scope.previewImage = "";
            toastr.success('The item is added successfully.', 'Success', {
              closeButton: true
            });
            return;
          },
          function onError(sailsResponse) {
            $('.add').val('');
            $scope.previewImage = "";
            toastr.error('The item failed in submission.', 'Error', {
              closeButton: true
            });
          }
          )
          .finally(function eitherWay() {
            $scope.addItemForm.loading = false;
          })
      }


    };
  }]);
