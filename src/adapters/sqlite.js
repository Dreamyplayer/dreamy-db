'use strict';

const { safeRequire } = require('../util');
const sqlite3 = safeRequire('sqlite3');
const Sql = require('./sql');
const { promisify } = require('util');

module.exports = class SQLite extends Sql {
  constructor(options = {}) {
    const { uri = 'sqlite://:memory:' } = options;
    super({
      dialect: 'sqlite',
      async connect() {
        return new Promise((resolve, reject) => {
          const path = uri.replace(/^sqlite:\/\//, '');
          const db = new sqlite3.Database(path, error => {
            if (error) {
              reject(error);
            } else {
              if (options.busyTimeout) {
                db.configure('busyTimeout', options.busyTimeout);
              }

              resolve(promisify(db.all.bind(db)));
            }
          });
        });
      },
      ...options,
    });
  }
};
