/**
 * isMerchant
 *
 * @module      :: Policy
 * @description :: Policy to allow only a merchant to put new items up for sale
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 * @author      :: pghoo
 *
 */
module.exports = function(req, res, next) {
  if (req.session.orPolicy) return next();
  req.session.orPolicy = false;
  if (!req.session.me) return res.forbidden('You are not logged in.');
  User.findOne(req.session.me).populate('role').exec(function (err, user){
    if (err) return res.serverError(err);
    if (!user) return res.forbidden('You are not logged in.');
    // if not merchant, send to next policy with false value
    if (user.role.name !== 'merchant') return next();
    // if merchant, with true value
    req.session.orPolicy = true;
    return next();
  });

};
