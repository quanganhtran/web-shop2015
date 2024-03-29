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
  prepare: function (req, res) {
    console.log(req.allParams());
    var numItems = parseInt(req.param('itemCount'));
    var details = [];
    for (var i = 1; i<=numItems; i++){
      var itemID = req.param('item_options_' + i).split('iid: ')[1];
      var qty = req.param('item_quantity_' + i);
      details.push({item: itemID, quantity:qty});
    };
    // Set the buyer to be the current user
    Order.create({createdBy: req.session.me}).exec(function (err, order) {
      try {
        if (err) return res.negotiate(err);
        var OD = details.map(function (e) {
          return {order: order.id, item: e.item, quantity: e.quantity};
        });
        console.log(order);
        if (OD.length == 0) throw new Error('An order cannot be empty.');
        OrderDetail.create(OD).exec(function (err, details) {
          if (err) Order.destroy(order.id).exec(function () {
            sails.log.error('Cannot create an OrderDetail.');
            return res.badRequest('Cannot process the request submitted.');
          });
          console.log(details);
          return res.redirect('/success');
        });
      } catch (e) {
        sails.log.error(e);
        Order.destroy(order.id).exec(function () {
          return res.badRequest('Cannot process the request submitted.');
        });
      }
    });
  },

  /**
   * OrderController.info()
   * Display an order
   *
   * @param  {Object}   req                     Request object
   * @param  {int}      req.params("id")        Order ID
   * @param  {Object}   res                     Response object
   */
  info: function (req, res) {
    if (res.wantsJSON) {
      return res.redirect('/api/order/' + req.param('id'));
    }
    Order.findOne(req.param('id')).populate('orderDetails').exec(function (err, order) {
      if (err) return res.negotatiate(err);
      if (!order) return res.notFound();
      return res.view('item/order', {
        order: order
      })
    });
  }
};

