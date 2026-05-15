Feature: Add product to cart and complete checkout
  As a user
  I want to add a product to my cart and complete the checkout
  So that I can purchase items successfully

  Scenario: Successful add to cart and checkout
    Given I am on the login page
    When I login with valid credentials
    And I add the "Sauce Labs Backpack" to the cart
    And I proceed to checkout
    And I enter my shipping information
    Then I should see the order confirmation
