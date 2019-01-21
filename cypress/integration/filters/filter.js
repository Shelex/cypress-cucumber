const {given} = require('cypress-cucumber-preprocessor/steps')

given('I open application', () => {
    cy.visit('/');
})