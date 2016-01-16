/**
 * Created by pghoo on 04/01/2016.
 */
angular.module('EditModule', ['toastr', 'compareTo']);

angular.element(document).ready(function() {
  var Module = document.getElementsByClassName("EditModule");
  angular.bootstrap(Module, ["EditModule"]);
});
