/**
* User.js
*
* @description :: User information.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  //autoPK: false,
  attributes: {
    username: {
      type: 'string',
      size: 16,
      unique: true,
      //primaryKey: true,
      required: true
    },
    email: {
      type: 'string',
      size: 45,
      email: true,
      required: true,
      unique: true
    },
    encryptedPassword: {
      type: 'string',
      size: 200,
      required: true
    },
    name: {
      type: 'string',
      size: 45
    },
    sells: {
      collection: 'item',
      via: 'createdBy'
    },
    purchases: {
      collection: 'order',
      via: 'createdBy'
    },
    address: {
      type: 'string',
      size: 45
    },
    phone: {
      type: 'string',
      size: 45
    },
    lastLoggedIn: {
      type: 'date'
    },
    gravatarUrl: {
      type: 'string',
      size: 45
    },
    role: {
      model: 'role',
      defaultsTo: 2
      // 1: admin, 2: registered, 3: merchant
    },
    isApplyingForMerchant: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param {Object} inputs
   * @param {String} inputs.username
   * @param {String} inputs.password
   * @param {Function} cb
   */

  attemptLogin: function (inputs, cb) {
    User.findOne({
        username: inputs.username,
        // TODO: But encrypt the password first
        password: inputs.password
      })
      .exec(cb);
  }

};

