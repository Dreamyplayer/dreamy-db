'use strict';

const {safeRequire} = require('../util');
const mysql = safeRequire('mysql2/promise');
const Sql = require('./Sql');

module.exports = class MySQL extends Sql {
	constructor(options = {}) {
		options = Object.assign(
			{
				dialect: 'mysql',
				uri: 'mysql://localhost'
			},
			options
		);
		options.connect = () =>
			Promise.resolve()
				.then(() => mysql.createConnection(options.uri))
				.then(connection => {
					return sql => connection.execute(sql).then(data => data[0]);
				});
		super(options);
	}
};
