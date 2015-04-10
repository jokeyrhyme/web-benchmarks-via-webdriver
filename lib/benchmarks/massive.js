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

    driver.get('http://kripken.github.io/Massive/');
    driver.wait(webdriver.until.elementLocated(By.css('#btn-run')), 10e3);

    element = driver.findElement(By.css('#btn-run'));
    element.click();

    driver.wait(webdriver.until.elementLocated(By.css('#btn-run > strong')), 1200e3);
    element = driver.findElement(By.css('#btn-run > strong'));
    element.getText().then(function (text) {
      score.actual = parseInt(text.replace(',', ''), 10);
      console.log(browser, 'massive', score);
      driver.quit();
      done();
    });

  };
};
