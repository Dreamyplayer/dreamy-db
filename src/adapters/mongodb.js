'use strict';

const EventEmitter = require('events');
const {safeRequire, removeKeyPrefix} = require('../util');
const mongojs = safeRequire('mongojs');

module.exports = class MongoDB extends EventEmitter {
  constructor(options = {}) {
    super();
    options.url = options.uri || undefined;
    this.options = Object.assign(
      {
        url: 'mongodb://127.0.0.1:27017',
        collection: 'dreamy',
      },
      options,
    );
    this.client = mongojs(this.options.url);
    const collection = this.client.collection(this.options.collection);
    collection.createIndex(
      {key: 1},
      {
        unique: true,
        background: true,
      },
    );
    this.db = ['update', 'find', 'findOne', 'remove'].reduce(
      (object, method) => {
        object[method] = require('util').promisify(
          collection[method].bind(collection),
        );
        return object;
      },
      {},
    );
    this.client.on('error', (error) => this.emit('error', error));
  }

  all() {
    return this.db.find().then((data) => {
      const array = [];
      for (const i in data) {
        array.push({
          key: removeKeyPrefix(data[i].key, this.options.namespace),
          value: this.options.deserialize(data[i].value),
        });
      }

      return array;
    });
  }

  clear() {
    return this.db
      .remove({key: new RegExp(`^${this.options.namespace}:`)})
      .then(() => undefined);
  }

  close() {
    return this.client.close();
  }

  delete(key) {
    return this.db.remove({key}).then((data) => data.n > 0);
  }

  get(key) {
    return this.db.findOne({key}).then((data) => {
      if (data === null) return undefined;
      return data.value;
    });
  }

  set(key, value) {
    return this.db.update({key}, {$set: {key, value}}, {upsert: true});
  }
};
