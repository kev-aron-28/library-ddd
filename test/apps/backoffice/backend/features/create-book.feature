Feature: Add a new book

Scenario: Add succesfully a book
  Given I send a POST request to "/backoffice/books/new" with body:
  """
  {
    "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
    "title": "Test title",
    "isbn": "",
    "author": {
      "id": "4efcbfa6-c063-46ee-a3fe-99da347f1507",
      "name": "Test author"
    },
    "categories": [
      {
        "id": "917a8905-5674-4150-bff4-fb263d4420fe",
        "name": "name"
      }
    ],
    "copies": [
      {
        "id": "4efcbfa6-c063-46ee-a3fe-99da347f1507",
        "format": "format",
        "location": "New location"
      }
    ]
  }
  """
  Then the response status code should be 302
