'use strict';

// 3rd-party modules

var webdriver = require('selenium-webdriver');

var By = webdriver.By;

// this module

module.exports = function (browser, driver) {
  return function (done) {
    var score = { actual: 0, total: 100 };
    var element;

    driver.get('http://kangax.github.io/compat-table/es6/');
    driver.wait(webdriver.until.elementLocated(By.css('th.current sup.num-features')), 10e3);

    element = driver.findElement(By.css('th.current sup.num-features'));
    driver.wait(webdriver.until.elementTextContains(element, '%'), 10e3);

    element.getText().then(function (text) {
      text = text.replace(/%/ig, '');
      score.actual = parseInt(text, 10);
      score.percent = 100 * score.actual / score.total;
      console.log(browser, 'kangax-es6', score);
      driver.quit();
      done();
    });

  };
};
