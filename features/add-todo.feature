Feature: Add a todo item
  As a user
  I want to add a new todo item
  So that I can track my tasks

  Scenario: Successfully adding a new todo item
    Given I am on the TodoMVC page
    When I add a todo with the text "Buy milk"
    Then I should see "Buy milk" in the todo list
