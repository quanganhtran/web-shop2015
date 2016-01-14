angular.module('HomepageModule', ['toastr', 'compareTo']);

angular.element(document).ready(function() {
  var HomepageModule = document.getElementById("HomepageModule");
  angular.bootstrap(HomepageModule, ["HomepageModule"]);
});
