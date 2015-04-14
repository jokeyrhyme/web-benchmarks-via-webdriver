'use strict';

// 3rd-party modules

var webdriver = require('selenium-webdriver');

var By = webdriver.By;

// this module

module.exports = function (browser, driver) {
  return function (done) {
    var score = { actual: 0 };
    var element;
    var s;

    driver.get('http://www.robohornet.org/');
    driver.wait(webdriver.until.elementLocated(By.css('#runButton')), 10e3);
    driver.sleep(2);

    element = driver.findElement(By.css('#runButton'));
    element.click();
    driver.sleep(2);

    /*eslint-disable no-loop-func*/
    for (s = 0; s <= 15; s++) {
      (function (subTest) {
        var id = '#benchmark-' + subTest;
        driver.wait(webdriver.until.elementLocated(By.css(id)), 10e3);
        element = driver.findElement(By.css(id));
        driver.wait(webdriver.until.elementTextContains(element, 'Completed'), 60e3);
      }(s));
    }

    driver.wait(webdriver.until.elementIsEnabled(element), 60e3);

    element = driver.findElement(By.css('#index'));
    element.getText().then(function (text) {
      score.actual = parseFloat(text, 10);
      console.log(browser, 'robohornet', score);
      driver.quit();
      done();
    });

  };
};
