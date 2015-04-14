'use strict';

// 3rd-party modules

var webdriver = require('selenium-webdriver');

var By = webdriver.By;

// this module

module.exports = function (browser, driver) {
  return function (done) {
    var score = { actual: 0 };
    var element;

    driver.get('http://octane-benchmark.googlecode.com/svn/latest/index.html');
    driver.wait(webdriver.until.elementLocated(By.css('#run-octane')), 10e3);

    element = driver.findElement(By.css('#run-octane'));
    element.click();

    driver.wait(webdriver.until.elementLocated(By.css('#main-banner')), 10e3);
    element = driver.findElement(By.css('#main-banner'));
    driver.wait(webdriver.until.elementTextContains(element, 'Octane Score: '), 120e3);

    element.getText().then(function (text) {
      text = text.replace('Octane Score: ', '').trim();
      score.actual = parseInt(text, 10);
      console.log(browser, 'octane', score);
      driver.quit();
      done();
    });

  };
};
