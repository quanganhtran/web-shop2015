/**
 * OrderDetail.js
 *
 * @description Represents a single batch of items in an order
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

