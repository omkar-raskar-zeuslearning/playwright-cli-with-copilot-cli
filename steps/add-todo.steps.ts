import { createBdd } from 'playwright-bdd';
import { todoPage } from '../todoPage';

const { Given, When, Then } = createBdd();

Given('I am on the TodoMVC page', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

When('I add a new todo item {string}', async ({ page }, label) => {
  const todo = todoPage(page);
  await todo.addTodo(label);
});

Then('I should see the todo item {string} in the list', async ({ page }, label) => {
  const todo = todoPage(page);
  const visible = await todo.isTodoVisible(label);
  if (!visible) throw new Error(`Todo item '${label}' not visible`);
});
