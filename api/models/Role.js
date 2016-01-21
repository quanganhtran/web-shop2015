/**
 * Role.js
 *
 * @module       Model/User
 * @description  Roles on the web store: admins, users, etc.
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
    }
  }
};

