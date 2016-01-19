/**
 * ItemController
 *
 * @module Controller/ItemController
 * @description Server-side logic for managing items
 */

module.exports = {

  /**
   * Put a new line of products up for sale
   *
   * @param  {Object}   req Request object
   * @param  {String}   req.param("name")
   * @param  {float}    req.param("price")
   * @param  {Object}   res Response object
   */
  submit: function (req, res) {
    if (!req.session.me) return res.forbidden();
    req.file('uploadFile').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 100000,
      dirname: '../../assets/images'
    }, function whenDone(err, uploadedFiles) {
      console.log(uploadedFiles);

      if (err) {
        return res.negotiate(err);
      }

      if (uploadedFiles.length === 0) {
        Item.create({
          name: req.param('name'),
          price: req.param('price'),
          createdBy: req.session.me,
          description: req.param('description'),
          imagePath: null,
          manufacturedDate: req.param('manufacturedDate')
        }).exec(function (err, item) {
          console.log('WANNABE WATANABE');
          return res.ok('No file was uploaded');
        });
      } else {
        console.log(sails.getBaseUrl());
        var intermediateStr = uploadedFiles[0].fd.split("images\\")[1];
        var imgPath = sails.getBaseUrl() + '/images/' + intermediateStr;
        // if no files were uploaded, respond with an error.
        // save the "fd" and the url where the image for an item can be accessed
        Item.create({
          name: req.param('name'),
          price: req.param('price'),
          createdBy: req.session.me,
          description: req.param('description'),
          imagePath: imgPath,
          manufacturedDate: req.param('manufacturedDate')
        }).exec(function (err, item) {
          if (err) return res.negotiate(err);
          return res.ok(item);
        });
      }
    })
  },

  /**
   * ItemController.modify()
   * Modify a line of products
   *
   * @param  {Object}   req
   *                     • price {Float}
   * @param  {Object} res
   */
  modify: function (req, res) {
    Item.update(req.param('id'), {
      name: req.param('name'),
      price: req.param('price')
    }).exec(function (err, item) {
      if (err) return res.negotiate(err);
      return res.ok(item);
    });
  }
  ,

  /**
   * ItemController.showProducts()
   * Route to the page that shows products
   *
   * @param  {Object} req
   * @param  {Object} res
   */
  showProducts: function (req, res) {
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();
      Item.find().populate('createdBy').exec(function foundItem(err, items) {
        if (err) return res.negotiate(err);
        return res.view('item/products', {
          items: items,
          me: user
        });
      })
    });
  }
  ,

  /**
   * ItemController.info()
   * Display an item page
   *
   * @param req
   * @param res
   */
  info: function (req, res) {
    if (req.wantsJSON) {
      return res.redirect('/api/item/' + req.param('id'));
    }
    Item.findOne(req.param('id')).exec(function (err, item) {
      if (err) return res.negotatiate(err);
      if (!item) return res.notFound();
      return res.view('item/item', {
        item: item
      })
    });
  }
  ,

// get the addItem view
  addItem: function (req, res) {
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();
      Item.find({}).exec(function foundItem(err, items) {
        if (err) return res.negotiate(err);
        return res.view('item/addItem', {
          items: items,
          me: user
        });
      })
    });
  }
  ,

  /**
   * `ItemController.banItem()`
   */
  banItem: function (req, res) {
    // Look up the items record from the database which is
    // referenced by the createdBy
    console.log(typeof(req.param('isSuspended')));
    console.log(req.param('isSuspended'));

    var isUserSuspended = req.param('isSuspended') == "true";

    console.log(isUserSuspended);
    Item.update({createdBy: req.param('createdBy')}, {isAvailable: !isUserSuspended})
      .exec(function afterwards(err, updated) {
        if (err) return res.negotiate(err);
        // If session refers to a user who no longer exists, still allow logout.
      });
    // also ban the items from the suspended user
    return res.ok;
  }
}
;
