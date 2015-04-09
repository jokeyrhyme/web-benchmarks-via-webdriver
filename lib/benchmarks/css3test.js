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
    var score = { actual: 0, total: 100 };
    var element;

    driver.get('http://www.css3test.com/');
    driver.wait(webdriver.until.elementLocated(By.css('#timeTaken')), 10e3);
    element = driver.findElement(By.css('#timeTaken'));
    driver.wait(webdriver.until.elementTextContains(element, 'ms'), 10e3);

    element = driver.findElement(By.css('#passedTests'));
    element.getText().then(function (text) {
      score.actual = parseInt(text, 10);
    });

    element = driver.findElement(By.css('#totalTests'));
    element.getText().then(function (text) {
      text = text.replace(/[a-z\s]/ig, '');
      score.total = parseInt(text, 10);
      score.percent = 100 * score.actual / score.total;
      console.log(browser, 'css3test', score);
      driver.quit();
      done();
    });
  };
};
