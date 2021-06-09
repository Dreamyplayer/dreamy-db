'use strict';

<<<<<<< Updated upstream
const {safeRequire} = require('../util');
=======
const { safeRequire } = require('../util');
>>>>>>> Stashed changes
const sqlite3 = safeRequire('sqlite3');
const Sql = require('./sql');

module.exports = class SQLite extends Sql {
  constructor(options = {}) {
    options = Object.assign(
      {
        dialect: 'sqlite',
        uri: 'sqlite://:memory:',
      },
      options,
    );
    options.path = options.uri.replace(/^sqlite:\/\//, '');
    options.connect = () =>
      new Promise((resolve, reject) => {
        const db = new sqlite3.Database(options.path, error => {
          if (error) {
            reject(error);
          } else {
            if (options.busyTimeout) {
              db.configure('busyTimeout', options.busyTimeout);
            }

            resolve(db);
          }
        });
<<<<<<< Updated upstream
      }).then((db) => require('util').promisify(db.all).bind(db));
=======
      }).then(db => require('util').promisify(db.all).bind(db));
>>>>>>> Stashed changes
    super(options);
  }
};
