Feature:Login Feature
Scenario: Unsuccessful login with invalid credentials
    Given the user is on the login page
    When the user enters invalid username or password
    And clicks the login button
    Then an error message should be displayed indicating invalid credentials