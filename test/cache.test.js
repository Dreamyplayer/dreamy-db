'use strict';

const test = require('ava');
const Dreamy = require('../src');

<<<<<<< Updated upstream
test.serial('Adapters (Cache)', async(t) => {
=======
test.serial('Adapters (Cache)', async t => {
>>>>>>> Stashed changes
  const store = new Map();
  const dreamy = new Dreamy({ store });
  t.is(store.size, 0);
  t.is(await dreamy.set('foo', 'bar'), true);
  t.is(await dreamy.get('foo'), 'bar');
  t.is(store.size, 1);
});
