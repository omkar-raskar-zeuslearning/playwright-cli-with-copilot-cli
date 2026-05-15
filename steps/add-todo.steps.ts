import { createBdd } from 'playwright-bdd';
import { todoPage } from '../pageObjects/todoPage';

const { Given, When, Then } = createBdd();

Given('I am on the TodoMVC page', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

When('I add a todo item with text {string}', async ({ page }, text: string) => {
  const todo = todoPage(page);
  await todo.addTodo(text);
});

Then('I should see {string} in the todo list', async ({ page }, text: string) => {
  const todo = todoPage(page);
  const visible = await todo.isTodoVisible(text);
  if (!visible) throw new Error(`Todo item '${text}' not found`);
});
