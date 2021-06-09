'use strict';

const test = require('ava');
const Dreamy = require('../src');

<<<<<<< Updated upstream
test.serial('Class', (t) => {
=======
test.serial('Class', t => {
>>>>>>> Stashed changes
  t.is(typeof Dreamy, 'function');
  t.throws(() => Dreamy());
  t.notThrows(() => new Dreamy());
});
