/**
 * orIsOwner
 *
 * @module      Policy
 * @description Allow the owner of an object (Item or Order) to perform actions on that object. To be used in conjunction with other "or" Policies.
 * @author      quanganhtran
 *
 */
module.exports = function(req, res, next) {
  if (req.session.orPolicy) return next();
  req.session.orPolicy = false;
  req.options.modelIdentity = req.options.model || req.options.controller;
  if (_.isEmpty(req.options.modelIdentity)) {
    req.session.orPolicy = true;
    return next();
  }
  req.model = sails.models[req.options.modelIdentity];

  if (!_.isObject(req.model) || _.isNull(req.model.identity)) {
    req.session.orPolicy = true;
    return next();
  }

  req.model.findOne(req.param('id')).exec(function (err, record){
    if (err || !record || !record.createdBy) {
      req.session.orPolicy = true;
      return next();
    }
    if (record.createdBy === req.session.me) {
      req.session.orPolicy = true;
      return next();
    }
    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    req.session.orPolicy = false;
    return next();
  });
};
