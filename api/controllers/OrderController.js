/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * OrderController.prepare()
   * Prepare a new order
   *
   * @param  {Object}   req
   * @param  {Function}   req.param
   * @prop   {OrderDetails[]} details
   *                     • item {Integer}
   *                     • quantity {Integer}
   * @param  {Function} res
   */
  prepare: function(req, res) {
    //try {
    //  var OD = req.param('details').map(function (e) {
    //    return {order: order.id, item: e.item, quantity: e.quantity};
    //  });
    //  if (OD.length == 0) throw new Error('An order cannot be empty.');
    //  OrderDetail.create(OD).exec(function(err, details){
    //    if (err) return res.negotiate(err);
    //    Order.create({createdBy: req.session.me});
    //    return res.ok();
    //  });
    //} catch (e) {
    //  sails.log.error(e);
    //  return res.badRequest('Cannot process the request submitted.');
    //}
    //Order.create({createdBy: req.session.me}).exec(function(err, order){
    //  try {
    //    if (err) return res.negotiate(err);
    //
    //  } catch (e) {
    //    sails.log.error(e);
    //    Order.destroy(order.id).exec(function(){
    //      return res.badRequest('Cannot process the request submitted.');
    //    });
    //  }
    //});

    // Set the buyer to be the current user
    Order.create({createdBy: req.session.me}).exec(function(err, order){
      try {
        if (err) return res.negotiate(err);
        var OD = req.param('details').map(function (e) {
          return {order: order.id, item: e.item, quantity: e.quantity};
        });
        if (OD.length == 0) throw new Error('An order cannot be empty.');
        OrderDetail.create(OD).exec(function(err, details){
          if (err) throw new Error(err);
          return res.ok();
        });
      } catch (e) {
        sails.log.error(e);
        Order.destroy(order.id).exec(function(){
          return res.badRequest('Cannot process the request submitted.');
        });
      }
    });

  }
};
