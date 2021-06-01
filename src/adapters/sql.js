'use strict';

const EventEmitter = require('events');
const {removeKeyPrefix, safeRequire} = require('../util');
const sql = safeRequire('sql');

module.exports = class SQL extends EventEmitter {
	constructor(options = {}) {
		super();
		this.options = Object.assign(
			{
				table: 'dreamy',
				keySize: 255
			},
			options
		);
		this.sql = new sql.Sql(this.options.dialect);
		this.entry = this.sql.define({
			name: this.options.table,
			columns: [
				{
					name: 'key',
					primaryKey: true,
					dataType: `VARCHAR(${Number(this.options.keySize)})`
				},
				{
					name: 'value',
					dataType: 'TEXT'
				}
			]
		});
		const table = this.entry
			.create()
			.ifNotExists()
			.toString();
		const connection = this.options
			.connect()
			.then(query => query(table).then(() => query))
			.catch(error => this.emit('error', error));
		this.query = sqlString => connection.then(query => query(sqlString));
	}

	all() {
		return this.query(this.entry.select('*').toString()).then(rows => {
			const array = [];
			for (const i in rows) {
				array.push({
					key: removeKeyPrefix(rows[i].key, this.options.namespace),
					value: this.options.deserialize(rows[i].value)
				});
			}

			return array;
		});
	}

	clear() {
		const del = this.entry
			.delete(this.entry.key.like(`${this.options.namespace}:%`))
			.toString();
		return this.query(del).then(() => undefined);
	}

	delete(key) {
		const select = this.entry
			.select()
			.where({key})
			.toString();
		const del = this.entry
			.delete()
			.where({key})
			.toString();
		return this.query(select).then(rows => {
			const row = rows[0];
			if (row === undefined) return false;
			return this.query(del).then(() => true);
		});
	}

	get(key) {
		const select = this.entry
			.select()
			.where({key})
			.toString();
		return this.query(select).then(rows => {
			const row = rows[0];
			if (row === undefined) return undefined;
			return row === undefined ? undefined : row.value;
		});
	}

	set(key, value) {
		let upsert;
		if (this.options.dialect === 'mysql') {
			value = value.replace(/\\/g, '\\\\');
		}

		if (this.options.dialect === 'postgres') {
			upsert = this.entry
				.insert({key, value})
				.onConflict({
					columns: ['key'],
					update: ['value']
				})
				.toString();
		} else {
			upsert = this.entry.replace({key, value}).toString();
		}

		return this.query(upsert);
	}
};
