given('I open application', () => {
  cy.visit('/');
});

then(`I see {string} in the title`, title => {
  cy.title().should('eq', title);
});

when(`I reload the page`, () => {
  cy.reduxStore()
    .as('initialState')
    .reload();
});

/*
check that after page reload state is not being reset
*/

then(`I see application state is persistant`, () => {
  cy.get('@initialState').then(initialState => {
    cy.reduxStore().should('be.deep.equal', initialState);
  });
});
