/**
 * Created by pghoo on 04/01/2016.
 */
angular.module('SignupModule', ['toastr', 'compareTo']);

angular.element(document).ready(function() {
  var SignupModule = document.getElementById("SignupModule");
  angular.bootstrap(SignupModule, ["SignupModule"]);
});
