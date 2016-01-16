angular.module('ProductsModule').controller('ProductsController', ['$scope', function($scope){
  $scope.quantity = 0;
  $scope.addToCart = function(item) {
    console.log("item", item);
    simpleCart
      .add('quantity='+$scope.quantity, 'name='+$scope.name, 'price='+$scope.price);
    return false;
  };
}]);
