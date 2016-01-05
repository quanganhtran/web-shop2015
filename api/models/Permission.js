/**
* Permission.js
*
* @description :: Contains important permissions on the database
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoPK: false,
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      autoIncrement: true,
      primaryKey: true,
      columnName: 'permid'
    },
    model: {
      type: 'string',
      size: 45
    },
    action: {
      type: 'string',
      enum: ['create', 'read', 'update', 'delete']
    },
    acl: {
      collection: 'accessControl',
      via: 'permission'
    }
  }
};

