'use strict';

const test = require('ava');
const Dreamy = require('../src');

test.serial('Multiple Dreamy instances', async(t) => {
  const dreamy = Dreamy.multi(['members', 'users']);
  t.is(await dreamy.members.set('foo', 'bar'), true);
  t.is(await dreamy.users.set('bar', 'foo'), true);
  t.is(await dreamy.members.has('foo'), true);
  t.is(await dreamy.users.has('bar'), true);
  t.is(await dreamy.members.get('foo'), 'bar');
  t.is(await dreamy.users.get('bar'), 'foo');
  t.is(await dreamy.members.clear(), undefined);
  t.is(await dreamy.users.clear(), undefined);
});
