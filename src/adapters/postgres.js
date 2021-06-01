'use strict';

const {safeRequire} = require('../util');
const pg = safeRequire('pg');
const Sql = require('./Sql');

module.exports = class PostgreSQL extends Sql {
	constructor(options = {}) {
		options = Object.assign(
			{
				dialect: 'postgres',
				uri: 'postgresql://localhost:5432'
			},
			options
		);
		options.connect = () =>
			Promise.resolve().then(() => {
				const client = new pg.Pool({
					connectionString: options.uri
				});
				return sql => client.query(sql).then(data => data.rows);
			});
		super(options);
	}
};
