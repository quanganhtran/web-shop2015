angular.module('DashboardModule', ['toastr']);

angular.element(document).ready(function() {
  var DashboardModule = document.getElementsByClassName("DashboardModule");
  angular.bootstrap(DashboardModule, ["DashboardModule"]);
});
