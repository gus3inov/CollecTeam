'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable('users', {
    id: {
        type: 'char',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: false,
        length: 255,
    },
    position_id: {
      type: 'smallint',
      length: 4,
      notNull: true
    },
    role_id: {
      type: 'smallint',
      length: 4,
      notNull: true
    },
    username: {
      type: 'char',
      length: 20,
      notNull: true,
      unique: true
    },
    email: {
      type: 'char',
      length: 32,
      notNull: true
    },
    first_name: {
      type: 'char',
      length: 32,
      notNull: true
    },
    last_name: {
      type: 'char',
      length: 32,
      notNull: true
    },
    avatar: {
      type: 'char',
      length: 255,
      notNull: true
    },
    password: {
      type: 'char',
      length: 76,
      notNull: true
    },
    salt: {
      type: 'char',
      length: 32,
      notNull: true
    }

}, callback);
};

exports.down = function(db) {
  db.dropTable('users', callback);
};

exports._meta = {
  "version": 1
};
