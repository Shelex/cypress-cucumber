Feature: UserHiringStages

   Background: Before each
      Given I open application
      Then I see "OOS: Crew applications" in the title

   Scenario Outline: ChangeStages
      When I change stage for <uuid> to <stage>
      Then I see member stage changed to <stage>

      Examples:
         | uuid                                   | stage        |
         | "4ff7567e-d639-4a5f-b440-adefe64e33c6" | hired        |
         | "6fc9d2bb-590c-4351-b0b9-45686e61a4ed" | interviewing |
         | "5ab45493-008f-4210-8479-8187da8b42ff" | interviewing |
         | "5ab45493-008f-4210-8479-8187da8b42ff" | hired        |
         | "d72e58c1-ada6-4a7a-b9c5-fb9fe023d620" | applied      |
         | "72e629c7-04a5-42fc-a552-6cf83576b0b5" | interviewing |
         | "72e629c7-04a5-42fc-a552-6cf83576b0b5" | applied      |
         | "4ff7567e-d639-4a5f-b440-adefe64e33c6" | hired        |
         | "6fc9d2bb-590c-4351-b0b9-45686e61a4ed" | hired        |
         | "5ab45493-008f-4210-8479-8187da8b42ff" | hired        |
         | "d72e58c1-ada6-4a7a-b9c5-fb9fe023d620" | hired        |
         | "72e629c7-04a5-42fc-a552-6cf83576b0b5" | hired        |
         | "4ff7567e-d639-4a5f-b440-adefe64e33c6" | interviewing |
         | "6fc9d2bb-590c-4351-b0b9-45686e61a4ed" | interviewing |
         | "5ab45493-008f-4210-8479-8187da8b42ff" | applied      |
         | "d72e58c1-ada6-4a7a-b9c5-fb9fe023d620" | applied      |
         | "72e629c7-04a5-42fc-a552-6cf83576b0b5" | applied      |

   Scenario: Member stage persistance
      When I change stage for "5ab45493-008f-4210-8479-8187da8b42ff" to hired
      And  I reload the page
      Then I see application state is persistant