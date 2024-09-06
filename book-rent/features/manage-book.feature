Feature: Update and delete owner book
  Updates and deletes books owned by users

  Scenario: update my own book
    Given the owner has a book in their collection
    When the owner requests to update the book details
    Then the system should respond with "success"

  Scenario: update book owned by another user
    Given there is a book owned by a different user
    When an unauthorized user attempts to update the book details
    Then the system should return an "error" message

  Scenario: delete my own book
    Given the user is the rightful owner of a specific book
    When the owner initiates the book deletion process
    Then the book should be removed from the system
    And the owner should receive a "success" confirmation

  Scenario: attempt to delete a book owned by another user
    Given there exists a book belonging to another user
    When an unauthorized user tries to delete the book
    Then the book should remain in the system
    And the unauthorized user should get an "error" notification
    

  Scenario: Book visibility after owner upload and admin approval
    Given an owner has uploaded a new book to the system
    When the system admin approves the uploaded book
    Then the book should appear in the list of books available for rent

  Scenario: Book invisibility when not approved by admin
    Given an owner has uploaded another a new book to the system
    When the admin has not approved the book
    Then the book should not be visible in the rental list

  Scenario: Owner wallet update after book rental
    Given the owner's initial wallet balance is recorded
    When a customer rents the book
    Then the owner's wallet should be incremented by the rental price

  Scenario: Book becomes unavailable when both pieces are rented
    Given an owner has uploaded two pieces of the same book
    When both pieces are rented
    Then the book should be unavailable for rent until one of them is returned

  Scenario: Only system admins can see and filter through all books from all owners
    Given the user is a system admin
    When the admin requests to view all books
    Then the system should display all books from all owners
