'use strict';

// 3rd-party modules

var async = require('async');

// this module

async.series([
  require('./lib/benchmarks/html5test'),
  require('./lib/benchmarks/css3test'),
  require('./lib/benchmarks/kangax-es6'),
  require('./lib/benchmarks/kangax-es7'),
  require('./lib/benchmarks/octane')
]);
