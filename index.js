'use strict';

// 3rd-party modules

var async = require('async');

// this module

var browsers = [
  'chrome',
  'firefox'
];

var tests = [
  // standards compliance
  require('./lib/benchmarks/css3test'),
  require('./lib/benchmarks/html5test'),
  require('./lib/benchmarks/kangax-es6'),
  require('./lib/benchmarks/kangax-es7'),
  require('./lib/benchmarks/test262'),
  // javascript performance
  require('./lib/benchmarks/jetstream'),
  require('./lib/benchmarks/octane'),
  require('./lib/benchmarks/robohornet'),
  require('./lib/benchmarks/speedometer')
];

var tasks = [];

browsers.forEach(function (browser) {
  return tests.forEach(function (test) {
    tasks.push(test(browser));
  });
});

async.series(tasks);
