import { Page } from '@playwright/test';

export const saucedemoPage = (page: Page) => {
  // Login form
  const usernameInput = page.getByPlaceholder('Username');
  const passwordInput = page.getByPlaceholder('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });

  // Inventory
  const addToCartBackpack = page.getByRole('button', { name: 'Add to cart' }).filter({ hasText: 'Sauce Labs Backpack' });
  const cartIcon = page.locator('[data-test="shopping-cart-link"]');

  // Cart
  const checkoutButton = page.getByRole('button', { name: 'Checkout' });

  // Checkout form
  const firstNameInput = page.getByPlaceholder('First Name');
  const lastNameInput = page.getByPlaceholder('Last Name');
  const postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
  const continueButton = page.getByRole('button', { name: 'Continue' });

  // Confirmation
  const finishButton = page.getByRole('button', { name: 'Finish' });
  const confirmationHeader = page.getByRole('heading', { name: /thank you/i });

  // Actions
  const login = async (username: string, password: string) => {
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
  };

  const addBackpackToCart = async () => {
    await addToCartBackpack.first().click();
  };

  const goToCart = async () => {
    await cartIcon.click();
  };

  const checkout = async () => {
    await checkoutButton.click();
  };

  const enterShippingInfo = async (first: string, last: string, zip: string) => {
    await firstNameInput.fill(first);
    await lastNameInput.fill(last);
    await postalCodeInput.fill(zip);
    await continueButton.click();
  };

  const finishOrder = async () => {
    await finishButton.click();
  };

  const isOrderConfirmed = async () => {
    return confirmationHeader.isVisible();
  };

  return {
    login,
    addBackpackToCart,
    goToCart,
    checkout,
    enterShippingInfo,
    finishOrder,
    isOrderConfirmed,
  };
};
