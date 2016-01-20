/**
 * orPolicy
 *
 * @module      Policy
 * @description :: When used orPolicy, check the or condition is fulfilled as the last policy
 * @help        :: http://sailsjs.org/#!/documentation/concepts/Policies
 */
module.exports = function(req, res, next) {

  if (req.session.orPolicy) return next();
  else res.forbidden('You are not permitted to perform this action.');

};
