/**
 * isMerchant
 *
 * @module      :: Policy
 * @description :: Policy to allow only a merchant to put new items up for sale
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 * @author      :: quanganhtran
 *
 */
module.exports = function(req, res, next) {
  if (!req.session.me) return res.forbidden('You are not logged in.');
  User.findOne(req.session.me).populate('role').exec(function (err, user){
    if (err) return res.serverError(err);
    if (!user) return res.forbidden('You are not logged in.');
    if (user.role.name === 'registered') return res.forbidden('You are not permitted to perform this action.');
    return next();
  });

};
