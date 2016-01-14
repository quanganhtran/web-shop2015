/**
 * Created by pghoo on 04/01/2016.
 */
angular.module('AddItemModule', ['toastr']);

angular.element(document).ready(function() {
  var Module = document.getElementsByClassName("AddItemModule");
  angular.bootstrap(Module, ["AddItemModule"]);
});
