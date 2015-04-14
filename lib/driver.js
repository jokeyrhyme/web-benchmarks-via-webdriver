'use strict';

// 3rd-party modules

var webdriver = require('selenium-webdriver');

// this module

module.exports = function (browser) {
  var driver = new webdriver.Builder()
    .forBrowser(browser)
    // .setFirefoxOptions()
    .build();

  driver.manage().timeouts().implicitlyWait(1e3);

  if (browser !== 'safari') {
    driver.manage().timeouts().pageLoadTimeout(60e3);
    driver.manage().timeouts().setScriptTimeout(60e3);
  }

  return driver;
};
