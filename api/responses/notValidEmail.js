/**
 * Usage:
 *
 * ```
 * res.emailAddressInUse();
 * ```
 *
 */

module.exports = function notValidEmail (){

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;

  return res.send(419, 'The e-mail address is not valid.');
};
