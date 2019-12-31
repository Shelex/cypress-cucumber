declare namespace Cypress {
    interface Chainable<Subject> {
        /*
        Dispatch CLEAR_FILTERS event
        */
        filterClear(): Chainable<any>
        /*
          Dispatch SET_FILTERS event
        */
        filterSet(name?: any, city?: any): Chainable<any>
        /*
          Dispatch SET_Stage event
        */
        hiringStageSet(uuid: any, hiringStage: any): Chainable<any>
        /*
          Get current state
        */
        reduxStore(): Chainable<any>
        /*
          Get member's cards
        */
        getMembers(): Chainable<any>
        /*
          Get number of users by stage column
        */
        getMembersByStage(stage: any): Chainable<any>
        /*
        util commands for data filtering (search users in storage by filters or uuid)
        */
        getMemberByUuid(storage: any, uuid: any): Chainable<any>
        getMembersByFilters(storage: any, dispatchBody: any): Chainable<any>
  }
}