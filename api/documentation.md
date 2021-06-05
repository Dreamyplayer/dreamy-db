# Documentation

## **`.all()`**⇒

> Gets all the elements from the database.

**Returns:**  All the elements in the database.

## `.clear()`⇒[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<`[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)`>`

> Clears all elements from the database.

**Returns:**  [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<`[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)`>`  —  Returns `undefined`

## `.delete(key)`⇒

> Deletes an element from the database by key.

**Parameters**

* `key` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)`|`[`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)`<`[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)`>`
  * **`Required*`**

The key\(s\) of the element to remove from the database.

**Returns:**    —  `true` if the element\(s\) is deleted successfully, otherwise `false`.

```javascript
await db.set('foo', 'bar'); // true
await db.delete('foo'); // true
await db.delete(['foo', 'fizz']); // [ true, false ]
```

## `.ensure(key, value, path=null)`⇒[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<any|`[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)`>`

> Ensures if an element exists in the database. If the element does not exist, sets the element to the database and returns the value.

**Parameters**

* `key` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) 
  * **`Required*`**

The key of the element to ensure.

* `value` : `*`
  * **`Required*`**

The value of the element to ensure.

* `path` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Default: null`**

**Returns:**  [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<any |` [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)`>`  —  The \(default\) value of the element.

**Example**

```javascript
await db.set('dreamy', 'db');
const data = await db.ensure('foo', 'bar');

console.log(data); // 'bar'

const data = await db.ensure('dreamy', 'db');
console.log(data); // 'db'
```

## `.find(fn, thisArg=undefined)`⇒[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<*|`[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)`>`

> Finds a single item where the given function returns a truthy value. Behaves [like](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find%20Array.prototype.find)  
> The database elements is mapped by their `key`.  
> If you want to find an element by key, you should use the `get` method instead.  
> See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get%20MDN) for more details.

**Parameters**

* `fn` : [`function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/function)
  * **`Required*`**

The function to execute on each value in the element.

* `thisArg` : `*`
  * **`Default: undefined`**

Object to use as `this` inside callback.

**Returns:**  [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<*|`[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)`>`  —  The first element in the database that satisfies the provided testing function. Otherwise `undefined` is returned

**Example**

```javascript
await db.set('foo', 'bar');
await db.set('profile', {
  id: 1234567890,
  username: 'user',
  verified: true,
  nil: null,
  hobbies: ['programming']
});

await db.find(v => v === 'bar'); // { key: 'foo', value: 'bar' }
await db.find(v => v.verified === true); // { key: 'profile', value: { ... } }
await db.find(v => v.desc === 'desc'); // undefined
```

## `.get(key, path=null)`⇒[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<*|`[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)`>`

> Gets the value of an element from the database by key.

**Parameters**

* `key` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Required*`**

The key of the element to get.

* `path` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Default: null`**

The path of the property to get from the value.

**Returns:**  [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<*|`[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)`>`  —  The value of the element, or `undefined` if the element cannot be found in the database.

**Example**

```javascript
const data = await db.get('foo');
console.log(data); // 'bar'

// Using path feature
await db.get('profile', 'verified'); // false
```

## `.has(key, path=null)`⇒[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<`[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/boolean)`>`

> Checks whether an element exists in the database or not.

**Parameters**

* `key` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Required*`**

The key of an element to check for.

* `path` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Default: null`**

The path of the property to check.

**Returns:**  [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<`[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/boolean)`>`  —  `true` if the element exists in the database, otherwise `false`.

## `.keys()`⇒

> Returns an array that contains the keys of each element.

**Returns:**    —  An array that contains the keys of each element.

## `.math(key, operation, operand, path=null)`⇒`true`

> Performs a mathematical operation on a value of an element.

**Parameters**

* `key` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Required*`**

The key of the element.

* `operation` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Required*`**

The mathematical operation to perform.

* `operand` : [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number)
  * **`Required*`**

The right-hand operand.

* `path` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Default: null`**

The path of the property to perform mathematical operation on.

**Returns:**  `true`  —  Returns `true`.

**Example**

```javascript
db.set('dreamy', 200);
db.math('dreamy', 'add', 200); // true
```

## `.multi(names, options=DreamyOptions)`⇒[`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

> Creates multiple instances of Dreamy-db.

**Parameters**

* `names` : [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)`<`[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)`>`
  * **`Required*`**

An array of strings. Each element will create new instance.

* `options` : [`DreamyOptions`](../overview/features.md#dreamyoptions-object)\`\`
  * **`Default: DreamyOptions`**

The options for the instances.

**Returns:**  [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)  —  An object containing created Dreamy-db instances.

**Example**

```javascript
const db = Dreamy.multi(['users', 'members']);
const db = Dreamy.multi(['users', 'members'], {
    uri: 'sqlite://test.sqlite',
    namespace: 'Mydb'
});
await db.users.set('foo', 'bar');
await db.members.set('bar', 'foo');
```

## `options`:[`DreamyOptions`](../overview/features.md#dreamyoptions-object)\`\`

> The options the database was instantiated with.

## `.push(key, value, path=null, allowDuplicates=false)`⇒[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<*>`

> Pushes an item to the array value in the database.

**Parameters**

* `key` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Required*`**

The key of the element to push to.

* `value` : `*`
  * `Required*`

The value to push.

* `path` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Default: null`**

The path of the property of the value to push.

* `allowDuplicates` : [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/boolean)
  * **`Default: false`**

Whether or not, allow duplicates elements in the value.

**Returns:**  [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<*>`  —  The value to push.

## `.remove(key, value, path=null)`⇒[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<*>`

> Removes an item from the array value of an element in the database.

{% hint style="warning" %}
structured or complex data types such as arrays or objects cannot be removed from the value of the element.
{% endhint %}

**Parameters**

* `key` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Required*`**

The key of the element to remove.

* `value` : `*`
  * **`Required*`**

The value to remove. Must be a string.

* `path` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Default: null`**

The path of the property to remove.

**Returns:**  [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<*>`  —  The value to remove.

## `.set(key, value, path=null)`⇒[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<true>`

> Sets an element to the database.

**Parameters**

* `key` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Required*`**

The key of the element to set to the database.

* `value` : `*`
  * **`Required*`**

The value of the element to set to the database.

* `path` : [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)
  * **`Default: null`**

The path of the property to set in the value.

**Returns:**  [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)`<true>`  —  Returns `true`.

**Example**

```javascript
// setting values
await db.set('foo', 'bar');

// In number
await db.set('total', 400);

// in Boolean
await db.set('exists', false);

// in Object
await db.set('profile', {
  id: 1234567890,
  username: 'user',
  verified: true,
  nil: null
});

// In Array
await db.set('todo', [ 'Add a authentication system.', 'Refactor the generator' ]);

// Boolean, String
await db.set('profile', false, 'verified');

// Number, String
await db.set('profile', 100, 'balance');
```

## `.values()`⇒

> Returns an array that contains the values of each element.

**Returns:**    —  Array that contains the values of each element.

