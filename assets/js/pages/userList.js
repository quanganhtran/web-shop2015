var app = angular.module('UserList', ['IdentityModule']);

app.controller('UserListController', function($scope, $http) {
  $http.get('/api/user').then(function (response) {
    $scope.users = response.data;
  });
});
