import { Page, Locator } from '@playwright/test';

/**
 * TodoMVC Page Object
 * Contains all locators and helper methods for interacting with TodoMVC application
 */
export class TodoMVCPage {
  readonly page: Page;
  
  // Main input
  readonly newTodoInput: Locator;
  
  // Todo list and items
  readonly todoList: Locator;
  readonly todoItems: Locator;
  
  // Footer elements
  readonly footer: Locator;
  readonly todoCount: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;
  readonly clearCompletedButton: Locator;
  
  // Toggle all
  readonly toggleAllCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Main input - using placeholder as observed
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    
    // Todo list
    this.todoList = page.locator('.todo-list');
    this.todoItems = page.locator('.todo-list li');
    
    // Footer elements
    this.footer = page.locator('.footer');
    this.todoCount = page.locator('.todo-count');
    this.filterAll = page.getByRole('link', { name: 'All' });
    this.filterActive = page.getByRole('link', { name: 'Active' });
    this.filterCompleted = page.getByRole('link', { name: 'Completed' });
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    
    // Toggle all checkbox
    this.toggleAllCheckbox = page.locator('.toggle-all');
  }

  /**
   * Navigate to TodoMVC application
   */
  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  /**
   * Add a new todo item
   */
  async addTodo(todoText: string) {
    await this.newTodoInput.fill(todoText);
    await this.newTodoInput.press('Enter');
  }

  /**
   * Add multiple todos from an array
   */
  async addMultipleTodos(todos: string[]) {
    for (const todo of todos) {
      await this.addTodo(todo);
    }
  }

  /**
   * Get a specific todo item by text
   */
  getTodoItem(todoText: string): Locator {
    return this.todoItems.filter({ hasText: todoText });
  }

  /**
   * Complete a todo item by checking its checkbox
   */
  async completeTodo(todoText: string) {
    const todoItem = this.getTodoItem(todoText);
    await todoItem.getByRole('checkbox').check();
  }

  /**
   * Uncomplete a todo item by unchecking its checkbox
   */
  async uncompleteTodo(todoText: string) {
    const todoItem = this.getTodoItem(todoText);
    await todoItem.getByRole('checkbox').uncheck();
  }

  /**
   * Check if a todo is marked as completed
   */
  async isTodoCompleted(todoText: string): Promise<boolean> {
    const todoItem = this.getTodoItem(todoText);
    const checkbox = todoItem.getByRole('checkbox');
    return await checkbox.isChecked();
  }

  /**
   * Edit a todo item
   */
  async editTodo(oldText: string, newText: string) {
    const todoItem = this.getTodoItem(oldText);
    await todoItem.dblclick();
    
    const editInput = this.page.locator('.todo-list li.editing .edit');
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  /**
   * Delete a todo item
   */
  async deleteTodo(todoText: string) {
    const todoItem = this.getTodoItem(todoText);
    await todoItem.hover();
    await todoItem.locator('.destroy').click();
  }

  /**
   * Toggle all todos (complete or uncomplete all)
   */
  async toggleAll() {
    await this.toggleAllCheckbox.click();
  }

  /**
   * Filter todos by type
   */
  async filterBy(filterType: 'All' | 'Active' | 'Completed') {
    switch (filterType) {
      case 'All':
        await this.filterAll.click();
        break;
      case 'Active':
        await this.filterActive.click();
        break;
      case 'Completed':
        await this.filterCompleted.click();
        break;
    }
  }

  /**
   * Clear all completed todos
   */
  async clearCompleted() {
    await this.clearCompletedButton.click();
  }

  /**
   * Get the count of visible todo items
   */
  async getTodoCount(): Promise<number> {
    return await this.todoItems.count();
  }

  /**
   * Get the text from the todo counter (e.g., "2 items left")
   */
  async getTodoCounterText(): Promise<string> {
    return await this.todoCount.textContent() || '';
  }

  /**
   * Check if a todo exists in the list
   */
  async hasTodo(todoText: string): Promise<boolean> {
    const todoItem = this.getTodoItem(todoText);
    return await todoItem.count() > 0;
  }

  /**
   * Check if footer is visible
   */
  async isFooterVisible(): Promise<boolean> {
    return await this.footer.isVisible();
  }

  /**
   * Check if clear completed button is visible
   */
  async isClearCompletedVisible(): Promise<boolean> {
    try {
      return await this.clearCompletedButton.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Get count of completed todos
   */
  async getCompletedCount(): Promise<number> {
    const completedTodos = this.todoItems.filter({ hasClass: 'completed' });
    return await completedTodos.count();
  }

  /**
   * Check if all todos are completed
   */
  async areAllTodosCompleted(): Promise<boolean> {
    const totalCount = await this.getTodoCount();
    const completedCount = await this.getCompletedCount();
    return totalCount > 0 && totalCount === completedCount;
  }

  /**
   * Try to add an empty todo (for testing validation)
   */
  async tryAddEmptyTodo() {
    await this.newTodoInput.fill('');
    await this.newTodoInput.press('Enter');
  }
}
