var app = angular.module('IdentityModule', []);

app.controller('IdentityController', function ($scope, $http) {
  $scope.me = window.SAILS_LOCALS.me;
});
