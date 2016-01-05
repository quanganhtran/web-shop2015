/**
 * Usage:
 *
 * ```
 * res.emailAddressInUse();
 * ```
 *
 */

module.exports = function usernameInUse (){

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;

  return res.send(418, 'The username is already taken by another user.');
};
