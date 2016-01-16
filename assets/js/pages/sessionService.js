/**
 * Created by Anh on 12/9/2015.
 */
var app = angular.module('SessionModule', ['ngCookies']);

app.controller('SessionController', function ($scope, $http) {

});

app.factory('SessionService', function ($scope, $http) {
  return {
    me: function () {
      $http.put('/login', {}).then(function (me) {
        return me;
      });
    },
    login: function (username, password, cb, err_cb ) {
      // Submit request to Sails.
      $http.put('/login', {
          username: username,
          password: password
      }).then(function onSuccess(data) {
          return cb(data);
      }, function onError(err) {
          return err_cb(err);
      });
    },
    logout: function (cb, err_cb) {
      $http.get('/logout').then(function (data) {
        return cb(data);
      }, function (err) {
        return err_cb(err);
      });
    }
  }
});
