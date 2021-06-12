'use strict';

const test = require('ava');
const Dreamy = require('../src');

test.serial('Adapters (Cache)', async t => {
  const store = new Map();
  const dreamy = new Dreamy({ store });
  t.is(store.size, 0);
  t.is(await dreamy.set('foo', 'bar'), true);
  t.is(await dreamy.get('foo'), 'bar');
  t.is(await dreamy.find(f => f === 'oof'), undefined);
  t.is(await dreamy.get('profile', 'verified'), undefined);
  t.is(store.size, 1);
});
