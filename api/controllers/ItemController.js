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
      createdBy: req.session.me,
      description: req.param('description'),
      imagePath: req.param('imagePath'),
      manufacturedDate: req.param('manufacturedDate')
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
  },

  /**
   * ItemController.showProducts()
   * Route to the page that shows products
   *
   * @param  {Object} req
   * @param  {Object} res
   */
  showProducts: function(req, res) {
    User.findOne(req.session.me, function foundUser (err, user){
      if (err) return next(err);
      if (!user) return next();
      Item.find().populate('createdBy').exec(function foundItem(err, items) {
        if (err) return res.negotiate(err);
        return res.view('item/products', {
          layout: 'layouts/loggedIn',
          items:items,
          me: user
        });
      })
    });
  },

  addItem: function(req, res) {
    User.findOne(req.session.me, function foundUser (err, user){
      if (err) return next(err);
      if (!user) return next();
      Item.find({}).exec(function foundItem(err, items) {
        if (err) return res.negotiate(err);
        return res.view('item/addItem', {
          layout: 'layouts/loggedIn',
          items:items,
          me: user
        });
      })
    });
  }

};

