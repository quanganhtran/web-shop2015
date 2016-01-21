/**
* User.js
*
* @description  Holds information about the users.
*/

module.exports = {
  //autoPK: false,
  attributes: {
    /**
     * @instance {String} username
     */
    username: {
      type: 'string',
      size: 16,
      unique: true,
      //primaryKey: true,
      required: true
    },
    /**
     * @instance {String} email
     */
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
    /**
     * @instance {String} name
     */
    name: {
      type: 'string',
      size: 45
    },
    /**
     * @instance {String} sells
     */
    sells: {
      collection: 'item',
      via: 'createdBy'
    },
    /**
     * @instance {String} purchases
     */
    purchases: {
      collection: 'order',
      via: 'createdBy'
    },
    /**
     * @instance {String} address
     */
    address: {
      type: 'string',
      size: 45
    },
    /**
     * @instance {String} phone
     */
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
    /**
     * @instance {String} role
     */
    role: {
      model: 'role',
      defaultsTo: 2
      // 1: admin, 2: registered, 3: merchant
    },
    isApplyingForMerchant: {
      type: 'boolean',
      defaultsTo: false
    },
    isSuspended: {
      type: 'boolean',
      defaultsTo: false
    }
  }

};

