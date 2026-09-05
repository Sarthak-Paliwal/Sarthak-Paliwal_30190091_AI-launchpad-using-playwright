Feature: Form Feature

  @new
  Scenario Outline: Successful form submission with valid data
    Given the user is on the form page
    When the user fills out the form with <name>, <email>, <gender>, <mobile>, <dob>, <subject>, <hobbies>, <currentAddress>, <state>, and <city>
    Then the form should be submitted successfully

    Examples:
      | name     | email                | gender | mobile     | dob      | subject | hobbies | currentAddress | state | city |
      | John Doe | john.doe@example.com | Male   | 1234567890 | 29122002 | Math    | Sports | 123 Main St    | NCR   | Agra |
      