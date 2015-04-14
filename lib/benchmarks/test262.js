'use strict';

// 3rd-party modules

var webdriver = require('selenium-webdriver');

var By = webdriver.By;

// this module

module.exports = function (browser, driver) {
  return function (done) {
    var score = { actual: 0, total: 100 };
    var element;

    driver.get('http://test262.ecmascript.org/');

    driver.wait(webdriver.until.elementLocated(By.css('#run')), 10e3);
    element = driver.findElement(By.css('#run'));
    element.click();

    driver.sleep(2e3);

    driver.wait(webdriver.until.elementLocated(By.css('#btnRunAll')), 10e3);
    element = driver.findElement(By.css('#btnRunAll'));
    element.click();

    element = driver.findElement(By.css('#testsToRun'));
    element.getText().then(function (text) {
      score.total = parseInt(text, 10);

      driver.wait(webdriver.until.elementLocated(By.css('#totalCounter')), 10e3);
      element = driver.findElement(By.css('#totalCounter'));
      driver.wait(webdriver.until.elementTextContains(element, '' + score.total), 1200e3);
    });

    element = driver.findElement(By.css('#Pass'));
    element.getText().then(function (text) {
      score.actual = parseInt(text, 10);
      score.percent = 100 * score.actual / score.total;
      console.log(browser, 'test262', score);
      driver.quit();
      done();
    });

  };
};
