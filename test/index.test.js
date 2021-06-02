const test = require("ava");
const Dreamy = require("../src");

test.serial("Class", (t) => {
  t.is(typeof Dreamy, "function");
  t.throws(() => Dreamy());
  t.notThrows(() => new Dreamy());
});
