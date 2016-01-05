/**
 * OrderDetail.js
 *
 * @description :: Represents a single batch of items in an order
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    order: {
      model: 'order',
      required: true
    },
    item: {
      model: 'item',
      required: true
    },
    quantity: {
      type: 'integer'
    }
  }

};

