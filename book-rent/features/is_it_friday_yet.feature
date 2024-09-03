Feature: Update owner book?
  updates book they own 

  Scenario: update my own book
    Given owner has book 
    When I ask whether to update the book details
    Then I should be told "success"

  Scenario: update book owned by another user
    Given a book owned by another user
    When I try to update the book details
    Then I should be get "error"

