/**
 * Item.js
 *
 * @description :: Items of the web shop
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      size: 25,
      required : true
    },
    imagePath: {
      type: 'string',
      size: 50
    },
    description: {
      type: 'string',
      size: 100
    },
    price: {
      type: 'float',
      required : true
    },
    manufacturedDate: {
      type: 'date'
    },
    createdBy: {
      model: 'user'
    },
    boughtIn: {
      collection: 'orderDetail',
      via: 'item'
    }
  }
};

