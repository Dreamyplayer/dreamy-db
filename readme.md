# Dreamy-db

## About

Dreamy-db - A Powerful database for storing, accessing, and managing database.

- Persistent storage
- Configurable
- Beginner-friendly

## Example

```js
const Dreamy = require("dreamy-db");

const db = new Dreamy.Database(); //Without Options

// or

const db = new Dreamy.Database({
  tableName: "dreamy", // optional
  fileName: "dreamy", // optional custom FileName
  path: "Database", // optional custom Database folder path
});

db.set("Item", "💡");
// -> { key: 'Item', value: '💡' }

db.set("Emoji", {
  id: 12345,
  emoji: "🐼",
  panda: true,
});
// -> { key: 'Emoji', value: '{ "id": 12345, "emoji": "🐼", "panda": true}' }

db.get("Item"); // -> 💡

db.has("Item"); // -> true

db.delete("Item"); // -> true

db.getAll();
// -> [ { key: 'Emoji', value: '{"id":12345,"emoji":"🐼","panda":true}' } ]

db.deleteAll(); // -> true
```

## Installing

**Node.js 10.0.0 or newer is required.**

#### Using npm:

```
npm install dreamy-db
```

#### Using yarn:

```
yarn add dreamy-db
```

### Windows

#### If you're having trouble installing `dreamy-db`

##### Run in Powershell as administrator

```js
npm -g --add-python-to-path install windows-build-tools node-gyp
```

##### Run

```js
npm install dreamy-db
```
