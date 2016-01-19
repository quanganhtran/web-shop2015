/**
 * Created by pghoo on 19/01/2016.
 */
var app = angular.module('myOrderModule', ['SessionModule']);


app.controller('myOrderController', ['$scope', '$http', function ($scope, $http) {

  // constructing data for My Orders page
  var orders = [];
  var orderDetails = [];
  var presentation = [];
  var row = [];
  var items = [];

  $http.get('/api/order').then(function (response) {
      $scope.orders = response.data;
      orders = response.data;
      // console.log(orders);
    })
    .then(function (response) {
      $http.get('/api/orderDetail').then(function (response) {
        $scope.orderDetails = response.data;
        orderDetails = response.data;
        // console.log(orderDetails);
      }).then(function (response) {
        for (var i = 0; i < orders.length; i++) {
          for (var j = 0; j < orderDetails.length; j++) {
            if (orders[i].id === orderDetails[j].id) {
              items.push(orderDetails[j].item.name);;
            }
          };
          row.push({oid: orders[i].id, items: items});
          console.log('o' + orders);
          console.log('od' + orderDetails);
        };
      })
    });


}]);
