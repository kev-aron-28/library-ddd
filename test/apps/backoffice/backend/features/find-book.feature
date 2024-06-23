Feature: Find books by author name, title or ISBN

Scenario: Search succesfully
  Given I send a POST request to "/backoffice/books/search" with body:
  """
  {
    "key": "1234"
  }
  """
  Then the response status code should be 200
