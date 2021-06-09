'use strict';

const test = require('ava');
const Dreamy = require('../src');

test.serial('Namespaces', async(t) => {
  const dreamy1 = new Dreamy({namespace: 'dreamy1'});
  const dreamy2 = new Dreamy({namespace: 'dreamy2'});
  t.is(await dreamy1.set('foo', 'bar'), true);
  t.is(await dreamy2.set('bar', 'foo'), true);
  t.is(await dreamy1.get('foo'), 'bar');
  t.is(await dreamy2.get('bar'), 'foo');
  t.is(await dreamy1.clear(), undefined);
  t.is(await dreamy1.get('foo'), undefined);
  t.is(await dreamy2.get('bar'), 'foo');
});
