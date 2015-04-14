'use strict';

// Node.js built-ins

var domain = require('domain');

// 3rd-party modules

var async = require('async');

// our modules

var makeDriver = require('./lib/driver');

// this module

var browsers = [
  'ie',
  'safari',
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
  require('./lib/benchmarks/massive'),
  require('./lib/benchmarks/octane'),
  require('./lib/benchmarks/robohornet'),
  require('./lib/benchmarks/speedometer')
];

var tasks = [];

browsers = browsers.filter(function (browser) {
  var driver;
  try {
    driver = makeDriver(browser);
    driver.quit();
    return true;
  } catch (err) {
    console.error(browser, 'cannot instantiate WebDriver');
    return false;
  }
});

browsers.forEach(function (browser) {
  return tests.forEach(function (test) {
    tasks.push(function (done) {
      var fn;
      var d = domain.create();
      var driver;

      d.on('error', function () {
        console.error(browser, 'error during automation');
        if (driver) {
          driver.quit();
        }
        done();
      });

      d.run(function () {
        driver = makeDriver(browser);
        fn = test(browser, driver);
        fn(done);
      });
    });
  });
});

async.series(tasks);
