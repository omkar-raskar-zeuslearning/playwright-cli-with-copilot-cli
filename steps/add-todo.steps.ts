import { createBdd } from 'playwright-bdd';
import { todoPage } from '../pageObjects/todoPage';

const { Given, When, Then } = createBdd();

Given('I am on the TodoMVC page', async ({ page }) => {
  await todoPage(page).goto();
});

When('I add a todo item with text {string}', async ({ page }, text) => {
  await todoPage(page).addTodo(text);
});

Then('I should see the todo item {string} in the list', async ({ page }, text) => {
  const visible = await todoPage(page).isTodoVisible(text);
  expect(visible).toBe(true);
});
