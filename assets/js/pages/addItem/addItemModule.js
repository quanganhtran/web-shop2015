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
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = new Date(yyyy+'-'+mm+'-'+dd);
    console.log(today);

    // set-up loading state
    $scope.addItemForm = {
      loading: false,
      manufacturedDate: today
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
