/**
 * Item.js
 *
 * @description Items of the web shop
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      size: 25,
      required : true
    },
    price: {
      type: 'float',
      required : true
    },
    createdBy: {
      model: 'user',
      required : true
    },
    description: {
      type: 'string',
      size: 100
    },
    imagePath: {
      type: 'string',
      size: 50
    },
    manufacturedDate: {
      type: 'date'
    },
    boughtIn: {
      collection: 'orderDetail',
      via: 'item'
    },
    isAvailable: {
      type: 'boolean',
      defaultsTo: true
    }
  }
};

