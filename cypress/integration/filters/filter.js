const {Given, When, Then} = require('cypress-cucumber-preprocessor/steps')
const { _ } = Cypress

Given('I open application', () => {
    cy.visit('/');
})

When (`I filter by {string} and {string}`, (name, city) => {
    cy.reduxStore().as('initialState')
    cy.filterSet(name, city).as('dispatchBody')
})

Then (`I see filters applied`, () => {
    cy.get('@initialState').then((initialState) => {
       cy.get('@dispatchBody').its('payload').then((dispatchBody) => {
        cy.wrap(_.filter(initialState.data, function(o) {
            return `${o.name.first} ${o.name.last}`.includes(dispatchBody.name) && o.location.city.includes(dispatchBody.city)
        })).as('expectedState')
            cy.get('@expectedState').then((expectedState) => {
                expect(expectedState.filters)
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
    cy.filterClear()
})

Then (`I see filters reset`, () => {
    cy.reduxStore().then((currentState) => {
        expect(currentState.filters).to.deep.equal({})
        cy.getMembers().then((members) => {
            expect(members.length).to.equal(currentState.data.length)
        })
    })
})