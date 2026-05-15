import { createBdd } from 'playwright-bdd';
import { todoPage } from '../pages/todoPage';

const { Given, When, Then } = createBdd();

Given('I am on the TodoMVC page', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

When('I add a todo item {string}', async ({ page }, todo) => {
  const todoPO = todoPage(page);
  await todoPO.addTodo(todo);
});

Then('I should see the todo item {string} in the list', async ({ page }, todo) => {
  const todoPO = todoPage(page);
  expect(await todoPO.isTodoVisible(todo)).toBeTruthy();
});
