/* eslint-disable no-undef */
'use strict';

const clearEach = async (Dreamy, options = {}) => {
  const db = new Dreamy(options);
  await db.clear();
};

const apiTest = (test, Dreamy, options = {}) => {
  test('methods return a Promise', () => {
    const db = new Dreamy(options);
    expect(db.all()).toBeInstanceOf(Promise);
    expect(db.clear()).toBeInstanceOf(Promise);
    expect(db.delete('foo')).toBeInstanceOf(Promise);
    expect(db.entries()).toBeInstanceOf(Promise);
    expect(db.get('foo')).toBeInstanceOf(Promise);
    expect(db.has('foo')).toBeInstanceOf(Promise);
    expect(db.keys()).toBeInstanceOf(Promise);
    expect(db.set('foo', 'bar')).toBeInstanceOf(Promise);
    expect(db.values()).toBeInstanceOf(Promise);
  });

  test('.all() resolves to an array', async () => {
    const db = new Dreamy(options);
    await db.set('foo', 'bar');
    expect(await db.all()).toContainEqual({ key: 'foo', value: 'bar' });
  });

  test('.clear() resolves to undefined', async () => {
    const db = new Dreamy(options);
    expect(await db.clear()).toBeUndefined();
    await db.set('foo', 'bar');
    expect(await db.clear()).toBeUndefined();
  });

  test('.delete(key) resolves to true', async () => {
    const db = new Dreamy(options);
    await db.set('foo', 'bar');
    expect(await db.delete('foo')).toBe(true);
  });

  test('.delete(key) with non-existent key resolves to false', async () => {
    const db = new Dreamy(options);
    expect(await db.delete('foo')).toBe(false);
  });

  test('.delete(key, path) deletes the property of the value', async () => {
    const db = new Dreamy(options);
    const path = 'fizz.buzz';
    await db.set('foo', 'bar', path);
    expect(await db.delete('foo', path)).toBe(true);
  });

  test('.get(key) resolves to value', async () => {
    const db = new Dreamy(options);
    await db.set('foo', 'bar');
    expect(await db.get('foo')).toBe('bar');
  });

  test('.get(key) with non-existent key resolves to undefined', async () => {
    const db = new Dreamy(options);
    expect(await db.get('foo')).toBeUndefined();
  });

  test('.get(key, path) gets the property of the value', async () => {
    const db = new Dreamy(options);
    const path = 'fizz.buzz';
    await db.set('foo', 'bar', path);
    expect(await db.get('foo', path)).toBe('bar');
  });

  test('.has(key) resolves to a true', async () => {
    const db = new Dreamy(options);
    await db.set('foo', 'bar');
    expect(await db.has('foo')).toBe(true);
  });

  test('.has(key) with non-existent key resolves to false', async () => {
    const db = new Dreamy(options);
    expect(await db.has('foo')).toBe(false);
  });

  test('.has(key, path) checks whether the property exists or not', async () => {
    const db = new Dreamy(options);
    const path = 'fizz.buzz';
    await db.set('foo', 'bar', path);
    expect(await db.has('foo', path)).toBe(true);
  });

  test('.set(key, value) resolves to true', async () => {
    const db = new Dreamy(options);
    expect(await db.set('foo', 'bar')).toBe(true);
  });

  test('.set(key, value) sets a value', async () => {
    const db = new Dreamy(options);
    await db.set('foo', 'bar');
    expect(await db.get('foo')).toBe('bar');
  });

  test('.set(key, value, path) sets the property to the value', async () => {
    const db = new Dreamy(options);
    const path = 'fizz.buzz';
    await db.set('foo', 'bar', path);
    expect(await db.get('foo')).toEqual({ fizz: { buzz: 'bar' } });
  });
};

const valueTest = (test, Dreamy, options = {}) => {
  test('value can be a boolean', async () => {
    const db = new Dreamy(options);
    await db.set('foo', true);
    expect(await db.get('foo')).toBe(true);
    await db.set('bar', false);
    expect(await db.get('bar')).toBe(false);
  });

  test('value can be null', async () => {
    const db = new Dreamy(options);
    await db.set('foo', null);
    expect(await db.get('foo')).toBeNull();
  });

  test('value can be a string', async () => {
    const db = new Dreamy(options);
    await db.set('foo', 'bar');
    expect(await db.get('foo')).toBe('bar');
  });

  test('value can be a number', async () => {
    const db = new Dreamy(options);
    await db.set('foo', 0);
    expect(await db.get('foo')).toBe(0);
  });

  test('value can be an object', async () => {
    const db = new Dreamy(options);
    await db.set('foo', {
      bar: 'fizz',
    });
    expect(await db.get('foo')).toEqual({ bar: 'fizz' });
  });

  test('value can be an array', async () => {
    const db = new Dreamy(options);
    await db.set('foo', ['bar']);
    expect(await db.get('foo')).toEqual(['bar']);
  });

  test('value can be a buffer', async () => {
    const db = new Dreamy(options);
    const buffer = Buffer.from('bar');
    await db.set('foo', buffer);
    expect(buffer.equals(await db.get('foo'))).toBe(true);
  });

  test('value can contain quotes', async () => {
    const db = new Dreamy(options);
    const value = '"';
    await db.set('foo', value);
    expect(await db.get('foo')).toBe(value);
  });
};

const adapterTest = (test, Dreamy, goodUri = '', badUri = '') => {
  test('infers the adapter from the URI', async () => {
    const db = new Dreamy(goodUri);
    await db.clear();
    expect(await db.get('foo')).toBeUndefined();
    await db.set('foo', 'bar');
    expect(await db.get('foo')).toBe('bar');
    await db.clear();
  });

  test('emits connection errors', done => {
    const db = new Dreamy(badUri);
    db.on('error', () => done());
  });
};

module.exports = { apiTest, clearEach, adapterTest, valueTest };
