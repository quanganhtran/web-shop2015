/**
 * Created by pghoo on 19/01/2016.
 */
var app = angular.module('myOrderModule', ['SessionModule']);


app.controller('myOrderController', ['$scope', '$http', 'SessionService', function ($scope, $http, SessionService) {

  $scope.me = window.SAILS_LOCALS.me;

  // constructing data for My Orders page
  var itemOrders = [], itemOrderDetails = [], users = [], rows = [], items = [];
  var orderPrice = 0;

  // Get identity of currently logged in user as a User object
  $http.put('/login', {}).then(function (res) {
    $scope.me = res.data;
    console.log($scope.me);
    $http.get('/api/user').then(function (response) {
      $scope.users = response.data;
      users = response.data;
      // construct data for order list page. OID, date, buyer, total price
      $http.get('/api/order').then(function (response) {
          $scope.orders = response.data;
          itemOrders = response.data;
        })
        .then(function (response) {
          $http.get('/api/orderDetail').then(function (response) {
            $scope.itemOrderDetails = response.data;
            itemOrderDetails = response.data;
          }).then(function (response) {

            for (var i = 0; i < itemOrders.length; i++) {
              // admin can see everything but others see only their orders
              if (($scope.me.role === 1) || $scope.me.id === itemOrders[i].createdBy.id) {
                for (var j = 0; j < itemOrderDetails.length; j++) {

                  if (itemOrders[i].id === itemOrderDetails[j].order.id) {
                    for (var u in users){
                      if (users[u].id === itemOrderDetails[j].item.createdBy){
                        sellerNames=users[u].username;
                      }
                    }
                    items.push({
                      itemName: itemOrderDetails[j].item.name,
                      itemQty: itemOrderDetails[j].quantity,
                      itemSeller: sellerNames
                    });
                    orderPrice += itemOrderDetails[j].item.price * itemOrderDetails[j].quantity;
                  }
                };
                var date = itemOrders[i].createdAt.split('T')[0];
                rows.push({oid: itemOrders[i].id, items: items,
                  orderPrice:orderPrice, date:date,
                  buyer:itemOrders[i].createdBy.username
                });
                items = [];
                orderPrice = 0;
              }
            };
            $scope.rows = rows;
          })
        });
    });
  }, function (err) {
    console.log('You are not logged in.');
  });
}]);
