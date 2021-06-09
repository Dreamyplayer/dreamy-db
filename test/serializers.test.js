'use strict';

const test = require('ava');
const Dreamy = require('../src');

test.serial('Custom Serializers', async(t) => {
  t.plan(2);
  const dreamy = new Dreamy({
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });
  t.is(await dreamy.set('foo', 'bar'), true);
  t.is(await dreamy.get('foo'), 'bar');
});

test.serial('Async Serializers', async(t) => {
  t.pass(4);
  const serialize = async(data) => {
    t.pass();
    return JSON.stringify(data);
  };

  const deserialize = async(data) => {
    t.pass();
    return JSON.parse(data);
  };

  const dreamy = new Dreamy({serialize, deserialize});
  t.is(await dreamy.set('foo', 'bar'), true);
  t.is(await dreamy.get('foo'), 'bar');
});
