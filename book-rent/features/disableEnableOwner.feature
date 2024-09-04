Feature: Disable/enable owner
  Admin can disable and enable owner account

Scenario: disable owner account
    Given an active owner account
    When I request to disable the owner account
    Then the owner account should be disabled
    And all associated books should be marked as unavailable

  Scenario: enable user account
    Given a disabled user account
    When I request to enable the user account
    Then the user account should be activated
