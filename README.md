<h1 align="center">
	<a href="https://dreamyplayer.gitbook.io/dreamy-db/">
  <img src="https://cdn.discordapp.com/attachments/851533693657808926/852172703431262228/ezgif.com-gif-maker_prev_ui.png" alt="dreamy-db"/>
	</a>
  <p>
    <a href="https://discord.gg/CNAJfbs5dn"><img src="https://img.shields.io/discord/849280500421492736?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/dreamy-db"><img src="https://img.shields.io/npm/v/dreamy-db?style=plastic?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/dreamy-db"><img src="https://img.shields.io/npm/dt/dreamy-db?style=plastic?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://github.com/Dreamyplayer/dreamy-db/actions"><img src="https://github.com/Dreamyplayer/dreamy-db/actions/workflows/test.yml/badge.svg" alt="Build status" /></a>
    <a href="https://travis-ci.com/Dreamyplayer/dreamy-db.svg?branch=master"><img src="https://travis-ci.com/Dreamyplayer/dreamy-db.svg?branch=master" alt="Dependencies" /></a>
    <a href="https://github.com/Dreamyplayer/dreamy-db/stargazers"><img src="https://img.shields.io/github/stars/Dreamyplayer/dreamy-db?style=social" alt="Patreon" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/dreamy-db/"><img src="https://nodei.co/npm/dreamy-db.png?downloads=true&downloadRank=true&stars=true" alt="npm installnfo" /></a>
  </p>
	Dreamy-db
</h1>

## About

 **Dreamy-db** - A Powerful database for storing, accessing, and managing multiple databases.\
 A powerful **[node.js](https://nodejs.org/)** module that allows you to interact with the databases very easily.

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

## Officially supported adapters
> By default, data is cached in memory. Optionally, install and utilize a "storage adapter".
- LevelDB
- MongoDB
- NeDB
- MySQL
- PostgreSQL
- Redis
- SQLite.
---
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
---

## Usage
```js
const { Dreamy } = require('dreamy-db');

const db = new Dreamy({
  uri: `ADD PATH TO DATABASE FILE OR SERVER`,
});

db.on('error', error => console.error('Connection Error: ', error));

(async () => {
  await db
    .set('Profile', {
      id: 1234567890,
      Name: 'Dreamy',
      verified: true,
      tags: ['dreamy-db', 'database'],
      height: 6.2,
      Balance: 450,
      Job: null,
    })
    .then(console.log)
    .catch(console.error);

  // Returns an array that contains the keys of each element.
  await db
    .keys()
    .then(data => console.log(data))
    .catch(console.error);

  // Returns an array that contains the values of each element.
  await db
    .values()
    .then(data => console.log(data))
    .catch(console.error);

  // Gets all the elements from the database.
  await db
    .all()
    .then(data => console.log(data))
    .catch(console.error);

  // Clears all elements from the database.
  await db.clear().then(console.log).catch(console.error);

  // Deletes an element from the database by key.
  await db.delete('profile').then(console.log).catch(console.error);

})(); // Callback
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
