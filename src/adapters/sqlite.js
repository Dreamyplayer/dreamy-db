'use strict';

const {safeRequire} = require('../util');
const sqlite3 = safeRequire('sqlite3');
const Sql = require('./sql');

module.exports = class SQLite extends Sql {
	constructor(options = {}) {
		options = Object.assign(
			{
				dialect: 'sqlite',
				uri: 'sqlite://:memory:'
			},
			options
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
			}).then(db =>
				require('util')
					.promisify(db.all)
					.bind(db)
			);
		super(options);
	}
};
