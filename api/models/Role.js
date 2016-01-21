/**
* Role.js
*
* @description :: Roles on the web store: admins, users, merchant
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    name: {
      type: 'string',
      size: '45',
      required: true,
      enum: ['admin', 'registered', 'merchant']
    },
    users: {
      collection: 'user',
      via: 'role'
    },
    acl: {
      collection: 'accessControl',
      via: 'role'
    }
  }
};

