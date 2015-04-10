'use strict';

// 3rd-party modules

var webdriver = require('selenium-webdriver');

var By = webdriver.By;

// our modules

var makeDriver = require('./../driver');

// this module

module.exports = function (browser) {
  return function (done) {
    var driver = makeDriver(browser);
    var score = { actual: 0 };
    var element;

    driver.get('http://www.robohornet.org/');
    driver.wait(webdriver.until.elementLocated(By.css('#runButton')), 10e3);
    driver.sleep(2);

    element = driver.findElement(By.css('#runButton'));
    element.click();
    driver.sleep(2);

    driver.wait(webdriver.until.elementIsEnabled(element), 600e3);

    element = driver.findElement(By.css('#index'));
    element.getText().then(function (text) {
      score.actual = parseFloat(text, 10);
      console.log(browser, 'robohornet', score);
      driver.quit();
      done();
    });

  };
};
