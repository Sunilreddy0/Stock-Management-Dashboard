const { Builder, By, Key, until } = require('selenium-webdriver');

// Replace 'chrome' with the appropriate browser (e.g., 'firefox', 'safari')
const driver = new Builder().forBrowser('chrome').build();

(async function example() {
  try {
    await driver.get('http://localhost:3000/login');

    await driver.findElement(By.id('username')).sendKeys('user')
    await driver.findElement(By.id('password')).sendKeys('pass')

    await driver.findElement(By.id('login-button')).click()

    await driver.get("http://localhost:3000/stock-list")
    await driver.wait(until.urlIs('http://localhost:3000/stock-list'),1000)

    console.log("Login test passed!!!")

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await driver.quit();
  }
})();