/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * ItemController.submit()
   * Put a new line of products up for sale
   *
   * @param  {Object}   req
   *                     • name  {String}
   *                     • price {Float}
   * @param  {Object} res
   */
  submit: function(req, res) {
    if (!req.session.me) return res.forbidden();
    Item.create({
      name: req.param('name'),
      price: req.param('price'),
      createdBy: req.session.me
    }).exec(function (err, item){
      if (err) return res.negotiate(err);
      return res.ok(item);
    });
  },

  /**
   * ItemController.modify()
   * Modify a line of products
   *
   * @param  {Object}   req
   *                     • price {Float}
   * @param  {Object} res
   */
  modify: function(req, res) {
    Item.update(req.param('id'),{
      name: req.param('name'),
      price: req.param('price')
    }).exec(function (err, item){
      if (err) return res.negotiate(err);
      return res.ok(item);
    });
  }

};

