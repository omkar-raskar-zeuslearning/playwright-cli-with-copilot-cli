import { Page } from '@playwright/test';

export const todoPage = (page: Page) => {
  const newTodoInput = page.getByRole('textbox', { name: 'What needs to be done?' });
  const todoItem = (label: string) => page.getByText(label, { exact: true });

  const addTodo = async (label: string) => {
    await newTodoInput.fill(label);
    await newTodoInput.press('Enter');
  };

  const isTodoVisible = async (label: string) => {
    return await todoItem(label).isVisible();
  };

  return {
    addTodo,
    isTodoVisible,
  };
};
