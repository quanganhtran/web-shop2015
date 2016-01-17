/**
 * isMerchant
 *
 * @module      :: Policy
 * @description :: Policy to allow only an admin to create and destroy items
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 * @author      :: won
 *
 */
module.exports = function(req, res, next) {
  if (req.session.orPolicy) return next();
  if (!req.session.me) {
    req.session.orPolicy = false;
    return next();
  }
  User.findOne(req.session.me).populate('role').exec(function (err, user){
    if (err) {
      req.session.orPolicy = false;
      return next();
    }
    if (!user) {
      req.session.orPolicy = false;
      return next();
    }
    if (user.role.name !== 'admin') {
      req.session.orPolicy = false;
      return next();
    }
    req.session.orPolicy = true;
    return next();
  });
};
