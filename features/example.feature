Feature: API test

  Scenario: Проверка API
    Given I send GET request to "/api/test"
    Then response status should be 200