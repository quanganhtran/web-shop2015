/**
 * OrderDetailController
 *
 * @description :: Server-side logic for managing orderdetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getOrderDetails: function (req, res) {
    OrderDetail.find().exec(function (err, orderDetails){
      if (err) return res.negotiate(err);
      return res.json(200, orderDetails);
    })
  }
};

