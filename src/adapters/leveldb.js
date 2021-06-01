'use strict';

const EventEmitter = require('events');
const {safeRequire} = require('../util');
const Level = safeRequire('level');

module.exports = class LevelDB extends EventEmitter {
	constructor(options = {}) {
		super();
		options = Object.assign(
			{
				uri: 'leveldb://db'
			},
			options
		);
		const client = new Level(
			options.uri.replace(/^leveldb:\/\//, ''),
			options,
			error => {
				if (error) this.emit('error', error);
			}
		);
		this.db = [
			'del',
			'createKeyStream',
			'createReadStream',
			'get',
			'put',
			'close'
		].reduce((object, method) => {
			object[method] = require('util').promisify(client[method].bind(client));
			return object;
		}, {});
	}

	all() {
		return this.db.createReadStream().then(stream => {
			stream.on('data', data => {
				return data;
			});
		});
	}

	clear() {
		return this.db.createKeyStream().then(stream => {
			stream.on('data', async data => {
				await this.db.del(data);
			});
			return undefined;
		});
	}

	close() {
		return this.db.close().then(() => undefined);
	}

	delete(key) {
		return this.db.del(key).then(data => data > 0);
	}

	get(key) {
		return this.db.get(key).then(data => {
			if (data === null) return undefined;
			return data;
		});
	}

	set(key, value) {
		return this.db.put(key, value);
	}
};
