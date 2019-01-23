const {When, Then} = require('cypress-cucumber-preprocessor/steps')

When (`I filter by {string} and {string}`, (name, city) => {
    cy.reduxStore().as('initialState')
    .filterSet(name, city).its('payload').as('dispatchBody')
})

Then (`I see filters applied`, () => {
    cy.get('@initialState').then((initialState) => {
       cy.get('@dispatchBody').then((dispatchBody) => {
        cy.getMembersByFilters(initialState, dispatchBody).then((expectedState) => {
            if (expectedState.length > 0) {
                cy.getMembers().then((members) => {
                    expect(expectedState.length).to.equal(members.length)
                })
            } else  cy.getMembers().should('not.exist')
        })
        })    
    })
})

When (`I clear filters`, () => {
    cy.filterSet('defaultvalue', 'defaultvalue')
    .filterClear()
})

Then (`I see filters reset`, () => {
    cy.reduxStore().then((currentState) => {
        expect(currentState.filters).to.deep.equal({})
        cy.getMembers().then((members) => {
            expect(members.length).to.equal(currentState.data.length)
        })
    })
})