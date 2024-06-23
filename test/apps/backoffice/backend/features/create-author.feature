Feature: Add a new author

Scenario: Add succesfully a Author
  Given I send a POST request to "/backoffice/authors/new" with body:
  """
  {
  "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
  "name": "test"
  }
  """
  Then the response status code should be 302
