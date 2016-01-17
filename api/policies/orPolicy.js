/**
 * orPolicy
 *
 * @module      :: Policy
 * @description :: TODO: You might write a short summary of how this policy works and what it represents here.
 * @help        :: http://sailsjs.org/#!/documentation/concepts/Policies
 */
module.exports = function(req, res, next) {

  if (req.session.orPolicy) return next();
  else res.forbidden('You are not permitted to perform this action.');

};
