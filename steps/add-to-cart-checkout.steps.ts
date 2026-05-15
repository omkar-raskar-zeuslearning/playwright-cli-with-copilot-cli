import { Given, When, Then } from '@playwright-bdd/cucumber';
import { expect } from '@playwright/test';
import { saucedemoPage } from '../page-objects/saucedemoPage';

Given('I am on the login page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
});

When('I login with valid credentials', async ({ page }) => {
  const saucedemo = saucedemoPage(page);
  await saucedemo.login('standard_user', 'secret_sauce');
});

When('I add the {string} to the cart', async ({ page }, productName) => {
  const saucedemo = saucedemoPage(page);
  await saucedemo.addBackpackToCart();
});

When('I proceed to checkout', async ({ page }) => {
  const saucedemo = saucedemoPage(page);
  await saucedemo.goToCart();
  await saucedemo.checkout();
});

When('I enter my shipping information', async ({ page }) => {
  const saucedemo = saucedemoPage(page);
  await saucedemo.enterShippingInfo('John', 'Doe', '12345');
  await saucedemo.finishOrder();
});

Then('I should see the order confirmation', async ({ page }) => {
  const saucedemo = saucedemoPage(page);
  expect(await saucedemo.isOrderConfirmed()).toBeTruthy();
});
