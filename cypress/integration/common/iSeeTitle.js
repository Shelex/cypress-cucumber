const {then} = require('cypress-cucumber-preprocessor/steps')

then(`I see {string} in the title`, (title) => {
    cy.title().should('eq', title)
  })