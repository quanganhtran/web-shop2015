angular.module('ProductsModule', ['IdentityModule']);

angular.element(document).ready(function() {
  var Module = document.getElementsByClassName("ProductsModule");
  angular.bootstrap(Module, ["ProductsModule"]);
});

angular.module('ProductsModule').controller('ProductsController', ['$scope', function($scope){

}]);
