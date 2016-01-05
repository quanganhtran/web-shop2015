/**
* AccessControl.js
*
* @description :: Define an authorized action through the combination of Role and Permission
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    role: {
      model: 'role',
      required: true
    },
    permission: {
      model: 'permission',
      required: true
    }
  }
};

