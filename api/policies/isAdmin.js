/**
 * isMerchant
 *
 * @module      Policy
 * @description :: Policy to allow only an admin to create and destory items
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 * @author      :: won
 *
 */
module.exports = function(req, res, next) {
  if (!req.session.me) return res.forbidden('You are not logged in.');
  User.findOne(req.session.me).populate('role').exec(function (err, user){
    if (err) return res.negotiate(err);
    if (!user) return res.forbidden('You are not logged in.');
    if (user.role.name !== 'admin') return res.forbidden('You are not permitted to perform this action.');
    return next();
  });

};
