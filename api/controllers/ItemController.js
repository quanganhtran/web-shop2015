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
  submit: function (req, res) {
    if (!req.session.me) return res.forbidden();

    Item.create({
      name: req.param('name'),
      price: req.param('price'),
      createdBy: req.session.me,
      description: req.param('description'),
      imagePath: req.param('imagePath'),
      manufacturedDate: req.param('manufacturedDate')
    }).exec(function (err, item) {
      if (err) return res.negotiate(err);
     // req.file.uploadFile = item.imagePath;
      return res.ok(item);
    });
  },

  imageUpload: function (req, res) {
    if(req.method === 'GET')
      return res.json({'status':'GET not allowed'});
    //	Call to /upload via GET is error

    var uploadFile = req.file('uploadFile');
    console.log(uploadFile);

    uploadFile.upload({ dirname: '../../assets/images'}, function onUploadComplete (err, files) {
      //	Files will be uploaded to .tmp/uploads

      if (err) return res.serverError(err);
      //	IF ERROR Return and send 500 error with error

      console.log(files);
      res.json({status:200, file:files});
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
  modify: function (req, res) {
    Item.update(req.param('id'), {
      name: req.param('name'),
      price: req.param('price')
    }).exec(function (err, item) {
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
  showProducts: function (req, res) {
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      Item.find().populate('createdBy').exec(function foundItem(err, items) {
        if (err) return res.negotiate(err);
        return res.view('item/products', {
          items: items,
          me: user
        });
      })
    });
  },

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
  },

  // get the addItem view
  addItem: function (req, res) {
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      Item.find({}).exec(function foundItem(err, items) {
        if (err) return res.negotiate(err);
        return res.view('item/addItem', {
          items: items,
          me: user
        });
      })
    });
  },

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
