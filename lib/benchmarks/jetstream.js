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

    driver.get('http://browserbench.org/JetStream/');
    driver.wait(webdriver.until.elementLocated(By.css('#status > a')), 10e3);

    element = driver.findElement(By.css('#status > a'));
    element.click();

    element = driver.findElement(By.css('#status'));
    driver.wait(webdriver.until.elementTextContains(element, 'Running iteration 3 of 3'), 120e3);

    element = driver.findElement(By.css('#result-summary'));
    driver.wait(webdriver.until.elementTextContains(element, 'Score'), 120e3);

    element = driver.findElement(By.css('#result-summary .score'));

    element.getText().then(function (text) {
      score.actual = parseFloat(text, 10);
      console.log(browser, 'jetstream', score);
      driver.quit();
      done();
    });

  };
};