var app = angular.module('IdentityModule', []);

app.controller('IdentityController', function ($scope, $http) {
  $scope.me = window.SAILS_LOCALS.me;
  //$http.put('/login', {
  //  username: username,
  //  password: password
  //}).then(function onSuccess(me) {
  //  $scope.me = me;
  //});
});
