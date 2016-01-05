/**
* Role.js
*
* @description :: Roles on the web store: admins, users, etc.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    name: {
      type: 'string',
      size: '45',
      required: true
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

