/* eslint-disable no-undef */
'use strict';

const { apiTest, clearEach, valueTest } = require('./src/index');
const { Dreamy } = require('../src');

describe('dreamy-db', () => {
  beforeEach(() => clearEach(Dreamy));

  test('should be a class', () => {
    expect(typeof Dreamy).toBe('function');
    expect(() => Dreamy()).toThrow();
    expect(() => new Dreamy()).not.toThrow();
  });

  test('should integrate the adapter provided', async () => {
    const store = new Map();
    const db = new Dreamy({ store });
    expect(store.size).toBe(0);
    await db.set('foo', 'bar');
    expect(await db.get('foo')).toBe('bar');
    expect(store.size).toBe(1);
  });

  test('should integrate custom serializers provided', async () => {
    const serialize = JSON.stringify;
    const deserialize = JSON.parse;
    const db = new Dreamy({
      serialize,
      deserialize,
    });
    expect(await db.set('foo', 'bar')).toBe(true);
    expect(await db.get('foo')).toBe('bar');
  });

  describe('API', () => {
    apiTest(test, Dreamy);
  });

  describe('value', () => {
    valueTest(test, Dreamy);
  });

  afterEach(() => clearEach(Dreamy));
});
