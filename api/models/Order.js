/**
 * Order.js
 *
 * @description :: Contains references to user and separate order lines (details)
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    orderDetails: {
      collection: 'OrderDetail',
      via: 'order'
    },
    createdBy: {
      model: 'user',
      required : true
    },
    delivered: {
      type: 'boolean'
    }
  },

  afterDestroy: function(destroyedRecords, cb) {
    OrderDetail.destroy({order: _.pluck(destroyedRecords, 'id')}).exec(cb);
  }
};
