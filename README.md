<h1 align="center">
	<a href="https://dreamyplayer.gitbook.io/dreamy-db/">
  <img src="https://cdn.discordapp.com/attachments/851533693657808926/851533740370690049/ezgif.com-gif-maker.png" alt="dreamy-db"/>
	</a>
  <p>
    <a href="https://discord.gg/CNAJfbs5dn"><img src="https://img.shields.io/discord/849280500421492736?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/dreamy-db"><img src="https://img.shields.io/npm/v/dreamy-db?style=plastic?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/dreamy-db"><img src="https://img.shields.io/npm/dt/dreamy-db?style=plastic?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://github.com/Dreamyplayer/dreamy-db/actions"><img src="https://github.com/Dreamyplayer/dreamy-db/actions/workflows/test.yml/badge.svg" alt="Build status" /></a>
    <a href="https://david-dm.org/Dreamyplayer/dreamy-db.svg"><img src="https://david-dm.org/Dreamyplayer/dreamy-db.svg?maxAge=3600" alt="Dependencies" /></a>
    <a href="https://github.com/Dreamyplayer/dreamy-db/stargazers"><img src="https://img.shields.io/github/stars/Dreamyplayer/dreamy-db?style=social" alt="Patreon" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/dreamy-db/"><img src="https://nodei.co/npm/dreamy-db.png?downloads=true&downloadRank=true&stars=true" alt="npm installnfo" /></a>
  </p>
	Dreamy-db
</h1>

## About

 **Dreamy-db** - A Powerful database for storing, accessing, and managing multiple databases.\
 **Dreamy-db** is a powerful **[node.js](https://nodejs.org/)** module that allows you to interact with the databases very easily.

## Why?

- Object-oriented
- Feature-rich
- Performant
- Configurable
- 100% Promise-based
- Speedy and efficient
- Persistent storage

## Features

- [**Adapters**](#usage): By default, data is cached in memory. Optionally, install and utilize a "storage adapter".
- [**Namespaces**](#namespaces): Namespaces isolate elements within the database to enable useful functionalities.
- [**Custom Serializers**](#custom-serializers): Utilizes its own data serialization methods to ensure consistency across various storage backends.
- [**Third-Party Adapters**](#third-party-adapters): You can optionally utilize third-party storage adapters or build your own.
- [**Embeddable**](#embeddable): Designed to be easily embeddable inside modules.
- **Data Types**: Handles all the JSON types including [`Buffer`](https://nodejs.org/api/buffer.html).
- **Error-Handling**: Connection errors are transmitted through, from the adapter to the main instance; consequently, connection errors do not exit or kill the process.

## Installation

**Node.js 12.x or newer is required.**

#### Using npm:

```bash
$ npm install dreamy-db
```

#### Using yarn:

```bash
$ yarn add dreamy-db
```

By default, data is cached in memory. Optionally, install and utilize a "storage adapter".

## Officially supported adapters are
- LevelDB
- MongoDB
- MySQL
- PostgreSQL
- Redis
- SQLite.

```bash
$ npm install level # LevelDB
$ npm install mongojs # MongoDB
$ npm install ioredis # Redis

# To use SQL database, an additional package 'sql' must be installed and an adapter
$ npm install sql

$ npm install mysql2 # MySQL
$ npm install pg # PostgreSQL
$ npm install sqlite3 # SQLite
```

## Usage

```javascript
const { Dreamy } = require('dreamy-db');

// Choose One of the following:
const db = new Dreamy();
const db = new Dreamy('leveldb://path/to/database');
const db = new Dreamy('mongodb://user:pass@localhost:27017/dbname');
const db = new Dreamy('mysql://user:pass@localhost:3306/dbname');
const db = new Dreamy('postgresql://user:pass@localhost:5432/dbname');
const db = new Dreamy('redis://user:pass@localhost:6379');
const db = new Dreamy('sqlite://path/to/database.sqlite');

// Handles connection errors
db.on('error', error => console.error('Connection Error: ', error));

await db.set('foo', 'bar'); // true
await db.find(data => data === 'bar'); // { key: 'foo', value: 'bar' }
await db.get('foo'); // 'bar'
await db.math('dreamy', 'add', 200); // true
await db.has('foo'); // true
await db.all(); // [ { key: 'foo', value: 'bar' } ]
await db.delete('foo'); // true
await db.clear(); // undefined
```

## Namespaces

Namespaces isolate elements within the database to avoid key collisions, separate elements by prefixing the keys, and allow clearance of only one namespace while utilizing the same database.

```javascript
const users = new Dreamy({ namespace: 'users' });
const members = new Dreamy({ namespace: 'members' });

await users.set('foo', 'users'); // true
await members.set('foo', 'members'); // true
await users.get('foo'); // 'users'
await members.get('foo'); // 'members'
await users.clear(); // undefined
await users.get('foo'); // undefined
await members.get('foo'); // 'members'
```

## Third-Party Adapters

You can optionally utilize third-party storage adapters or build your own. *Dreamy* will integrate the third-party storage adapter and handle complex data types internally.

```javascript
const myAdapter = require('./my-adapter');
const database = new Dreamy({ store: myAdapter });
```

For example, [`quick-lru`](https://github.com/sindresorhus/quick-lru) is an unrelated and independent module that has an API similar to that of *Dreamy*.

```javascript
const QuickLRU = require('quick-lru');

const lru = new QuickLRU({ maxSize: 1000 });
const database = new Dreamy({ store: lru });
```

## Custom Serializers

*Dreamy-db* handles all the JSON data types including Buffer using its data serialization methods that encode Buffer data as a base64-encoded string, and decode JSON objects which contain buffer-like data, either as arrays of strings or numbers, into Buffer instances to ensure consistency across various backends.

Optionally, pass your own data serialization methods to support extra data types.

```javascript
const database = new Dreamy({
    serialize: JSON.stringify,
    deserialize: JSON.parse
});
```

| :warning: warning    | Using custom serializers means you lose any guarantee of data consistency. |
|----------------------|:---------------------------------------------------------------------------|


## Embeddable

*Dreamy-db* is designed to be easily embeddable inside modules. It is recommended to set a [namespace](#namespaces) for the module.

```javascript
class MyModule {
    constructor(options) {
        this.db = new Dreamy({
            uri: typeof opts.store === 'string' && opts.store,
			store: typeof opts.store !== 'string' && opts.store
            namespace: 'mymodule'
        });
    }
}

// Caches data in the memory by default.
const myModule = new MyModule();

// After installing ioredis.
const myModule = new MyModule({ store: 'redis://localhost' });
const myModule = new AwesomeModule({ store: thirdPartyAdapter });
```

## Links

- **[Documentation](https://dreamyplayer.gitbook.io/dreamy-db "Documentation")**
- **[Examples](https://dreamyplayer.gitbook.io/dreamy-db/api/examples "Examples")**
- **[GitHub Repo](https://github.com/Dreamyplayer/dreamy-db "GitHub Repository")**
- **[Discord](https://discord.gg/CNAJfbs5dn "Discord")**
- **[NPM Package](https://www.npmjs.com/package/dreamy-db "NPM Package")**

<h1 align="center">
	<a href="https://discord.gg/CNAJfbs5dn">
  <img src="https://cdn.discordapp.com/attachments/851533693657808926/851533841049976893/Screenshot_from_2021-06-07_23-24-27.png" />
	</a>
</h1>
