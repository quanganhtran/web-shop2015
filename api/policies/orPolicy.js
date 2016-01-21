/**
 * orPolicy
 *
 * @module      Policy
 * @description When used orPolicy with other "or" Policies, check if the or condition is fulfilled as the last policy.
 */
module.exports = function(req, res, next) {

  if (req.session.orPolicy) return next();
  else res.forbidden('You are not permitted to perform this action.');

};
