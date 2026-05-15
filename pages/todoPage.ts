import { Page } from '@playwright/test';

export const todoPage = (page: Page) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');
  const todoListItem = (text: string) => page.getByRole('listitem', { name: text });

  const addTodo = async (todo: string) => {
    await todoInput.fill(todo);
    await todoInput.press('Enter');
  };

  const isTodoVisible = async (todo: string) => {
    return await todoListItem(todo).isVisible();
  };

  return {
    addTodo,
    isTodoVisible,
  };
};
