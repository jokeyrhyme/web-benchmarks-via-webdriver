'use strict';

// 3rd-party modules

var webdriver = require('selenium-webdriver');

var By = webdriver.By;

// this module

module.exports = function (browser, driver) {
  return function (done) {
    var score = { actual: 0 };
    var element;

    driver.get('http://browserbench.org/Speedometer/');
    driver.wait(webdriver.until.elementLocated(By.css('.buttons > button')), 10e3);

    element = driver.findElement(By.css('.buttons > button'));
    element.click();

    driver.wait(webdriver.until.elementLocated(By.css('#result-number')), 10e3);
    element = driver.findElement(By.css('#result-number'));
    driver.wait(webdriver.until.elementTextMatches(element, /\d+/), 600e3);

    element.getText().then(function (text) {
      score.actual = parseInt(text, 10);
      console.log(browser, 'speedometer', score);
      driver.quit();
      done();
    });

  };
};
