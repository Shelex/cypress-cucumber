Feature: Filters

  Background: Before each
    Given I open application
    Then I see "OOS: Crew applications" in the title

  Scenario Outline: Filtering
    When I filter by "<name>" and "<city>"
    Then I see filters applied

    Examples:
      | name        | city       |
      | ruiz        |            |
      | moore       |            |
      |             | worcester  |
      | lloyd       | hereford   |
      | cunningham  | sheffield  |
      | Ruiz        |            |
      | cunninghams |            |
      |             | sheffields |
      |             | Ford       |
      |             |            |
      |             | l          |
      | ll          |            |
      | 漢           |            |
      |             | ї          |

  Scenario: Clear Filters
    When I clear filters
    Then I see filters reset

  Scenario: Filter persistance
    When I filter by "ll" and "<city>"
    And  I reload the page
    Then I see application state is persistant