---
description: Node.js 12.0.0 or newer is required.
---

# Installation

## Getting Super Powers

Becoming a super hero is a fairly straight forward process:

#### Using npm:

```bash
npm install dreamy-db
```

#### Using yarn:

```bash
yarn add dreamy-db
```

{% hint style="info" %}
By default, data is cached in memory. Optionally, install and utilize a "storage adapter".
{% endhint %}

#### Officially supported adapters are

* LevelDB
* MongoDB
* NeDB
* MySQL
* PostgreSQL
* Redis 
* SQLite.

```bash
# Choose One of the following:

$ npm install mongojs # MongoDB
$ npm install mysql2 # MySQL
$ npm install sqlite3 # SQLite
$ npm install ioredis # Redis
$ npm install pg # PostgreSQL
$ npm install level # LevelDB

# To use SQL database, an additional package 'sql' must be installed and an adapter
$ npm install sql
```

{% hint style="info" %}
Super-powers are granted randomly so please submit an issue if you're not happy with yours.
{% endhint %}

Once you're strong enough, save the world:

```javascript
// main.js || index.js

const Database = require("dreamy-db");
```



