'use strict';

// 3rd-party modules

var webdriver = require('selenium-webdriver');

var By = webdriver.By;

// our modules

var makeDriver = require('./../driver');

// this module

module.exports = function (done) {
  var driver = makeDriver();
  var score = { actual: 0, total: 100 };
  var element;

  driver.get('http://www.html5test.com/');
  driver.wait(webdriver.until.elementLocated(By.css('.pointsPanel h2 strong')), 10e3);
  driver.sleep(2);

  element = driver.findElement(By.css('.pointsPanel h2 strong'));
  element.getText().then(function (text) {
    score.actual = parseInt(text, 10);
  });

  element = driver.findElement(By.css('.pointsPanel h2 span:last-child'));
  element.getText().then(function (text) {
    text = text.replace(/[a-z\s]/ig, '');
    score.total = parseInt(text, 10);
    score.percent = 100 * score.actual / score.total;
    console.log('html5test', score);
    driver.quit();
    done();
  });
};