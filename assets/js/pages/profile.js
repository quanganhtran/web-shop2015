var app = angular.module('ProfileModule',['SessionModule']);

app.controller('ProfileController', function($scope, $http) {
  $scope.user = window.SAILS_LOCALS.user
});
