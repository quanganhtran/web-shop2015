var app = angular.module('IdentityModule',[]);

app.controller('IdentityController', function($scope) {
  $scope.me = window.SAILS_LOCALS.me;
});
