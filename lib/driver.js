'use strict';

// 3rd-party modules

var webdriver = require('selenium-webdriver');

// this module

module.exports = function () {
  var driver = new webdriver.Builder()
    .forBrowser('firefox')
    // .setFirefoxOptions()
    .build();

  driver.manage().timeouts().implicitlyWait(1e3);
  driver.manage().timeouts().pageLoadTimeout(60e3);
  driver.manage().timeouts().setScriptTimeout(60e3);

  return driver;
};
