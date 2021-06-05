# Features

* \*\*\*\*[**DreamyOptions**](features.md#dreamyoptions-object)\*\*\*\*
* \*\*\*\*[**Namespaces**](features.md#namespaces)\*\*\*\*
* \*\*\*\*[**Third-Party Adapters**](features.md#third-party-adapters)
* \*\*\*\*[**Custom Serializers**](features.md#custom-serializers)\*\*\*\*
* \*\*\*\*[**Embeddable**](features.md#embeddable)\*\*\*\*

## DreamyOptions : [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

The options for Dreamy-db.

#### `new Dreamy( options = { } )`

**Parameters**

* `options` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)`| DreamyOptions`

#### 

#### Properties

#### `uri` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)

The connection URI of the database.

**`namespace` :** [**`string`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)\*\*\*\*

The namespace of the database.

* **`adapter` :** [**`string`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)\*\*\*\*

The storage adapter or backend to use.

* **`store` : `*`**

The options for `Dreamy.`

* **`serialize` :** [**`function`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/function)\*\*\*\*

A data serialization function.

* **`deserialize` :** [**`function`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/function)\*\*\*\*

A data deserialization function.

* **`collection` :** [**`string`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)\*\*\*\*

The name of the collection. Only works for MongoDB.

* **`table` :** [**`string`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)\*\*\*\*

The name of the table. Only works for SQL databases.

* **`keySize` :** [**`number`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number)\*\*\*\*

The maximum size of the keys of elements.

#### Example:

```javascript
const Database = require("dreamy-db");

// SQLite Adapter
const db = new Database.Dreamy({
  uri: "sqlite://DataBase/test.sqlite",
  namespace: "dreamy",
  table: "dreamy"
});
```

{% hint style="info" %}
These Options are optional only.
{% endhint %}

## Namespaces

**Namespaces** isolate elements within the database to avoid key collisions, separate elements by prefixing the keys, and allow clearance of only one namespace while utilizing the same database.

```javascript
const alive = new Database.Dreamy({ namespace: 'alive' });
const dead = new Database.Dreamy({ namespace: 'dead' });

// Setting
await alive.set('zombie', 'alive'); // true
await dead.set('zombie', 'dead'); // true

// getting
await alive.get('zombie'); // 'alive'
await dead.get('zombie'); // 'dead'

// clearing alive key
await alive.clear(); // undefined

await alive.get('zombie'); // undefined
await dead.get('zombie'); // 'dead'
```

## Third-Party Adapters

You can optionally utilize third-party storage adapters or build your own.   
**Dreamy-db** will integrate the third-party storage adapter and handle complex data types internally.

```javascript
const myAdapter = require('./my-adapter');
const db = new Database.Dreamy({ store: myAdapter });
```

{% hint style="info" %}
For example, [`quick-lru`](https://github.com/sindresorhus/quick-lru) is an unrelated and independent module that has an API similar to that of **Dreamy-db**.
{% endhint %}

```javascript
const QuickLRU = require('quick-lru');

const lru = new QuickLRU({ maxSize: 1000 });
const db = new Database.Dreamy({ store: lru });
```

## Custom Serializers

**Dreamy-db** handles all the **JSON** data types including Buffer using its data serialization methods that encode Buffer data as a base64-encoded string, and decode JSON objects which contain buffer-like data, either as arrays of strings or numbers, into Buffer instances to ensure consistency across various backends.

Optionally, pass your own data serialization methods to support extra data types.

```javascript
const db = new Database.Dreamy({
    serialize: JSON.stringify,
    deserialize: JSON.parse
});
```

{% hint style="warning" %}
Using custom serializers means you lose any guarantee of data consistency.
{% endhint %}

## Embeddable

**Dreamy-db** is designed to be easily embeddable inside modules. It is recommended to set a [namespace](https://github.com/Dreamyplayer/dreamy-db#namespaces) for the module.

```javascript
class MyModule {
    constructor(options) {
        this.db = new Database.Dreamy({
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

