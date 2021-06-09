'use strict';

const test = require('ava');
const Dreamy = require('../src');

<<<<<<< Updated upstream
test.serial('Custom Serializers', async(t) => {
=======
test.serial('Custom Serializers', async t => {
>>>>>>> Stashed changes
  t.plan(2);
  const dreamy = new Dreamy({
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });
  t.is(await dreamy.set('foo', 'bar'), true);
  t.is(await dreamy.get('foo'), 'bar');
});

<<<<<<< Updated upstream
test.serial('Async Serializers', async(t) => {
  t.pass(4);
  const serialize = async(data) => {
=======
test.serial('Async Serializers', async t => {
  t.pass(4);
  const serialize = async data => {
>>>>>>> Stashed changes
    t.pass();
    return JSON.stringify(data);
  };

<<<<<<< Updated upstream
  const deserialize = async(data) => {
=======
  const deserialize = async data => {
>>>>>>> Stashed changes
    t.pass();
    return JSON.parse(data);
  };

<<<<<<< Updated upstream
  const dreamy = new Dreamy({serialize, deserialize});
=======
  const dreamy = new Dreamy({ serialize, deserialize });
>>>>>>> Stashed changes
  t.is(await dreamy.set('foo', 'bar'), true);
  t.is(await dreamy.get('foo'), 'bar');
});
