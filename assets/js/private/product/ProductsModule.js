angular.module('ProductsModule', ['toastr']);

angular.element(document).ready(function() {
  var Module = document.getElementsByClassName("ProductsModule");
  angular.bootstrap(Module, ["ProductsModule"]);
});
