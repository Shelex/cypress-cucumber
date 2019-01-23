const {Given, Then} = require('cypress-cucumber-preprocessor/steps')

Given('I open application', () => {
  cy.visit('/');
})

Then(`I see {string} in the title`, (title) => {
  cy.title().should('eq', title)
})

When (`I reload the page`, () => {
  cy.reduxStore().as('initialState')
  .reload()
})

Then (`I see application state is persistant`, () => {
  cy.get('@initialState').then((initialState) => {
      cy.reduxStore().then((currentState) => {
          expect(currentState).to.deep.equal(initialState)
      })
  })
})