when(`I filter by {string} and {string}`, (name, city) => {
  cy.reduxStore()
    .as('initialState')
    .filterSet(name, city)
    .its('payload')
    .as('dispatchBody');
});

/*
Get current state, apply filter and check that data left after filtering is equal to calculated
If filter has no results check that no member left
*/

then(`I see filters applied`, () => {
  cy.get('@initialState').then(initialState => {
    cy.get('@dispatchBody').then(dispatchBody => {
      cy.getMembersByFilters(initialState, dispatchBody).then(expectedState => {
        if (expectedState.length > 0) {
          cy.getMembers().should('have.length', expectedState.length);
        } else {
          cy.getMembers().should('not.exist');
        }
      });
    });
  });
});

when(`I clear filters`, () => {
  cy.filterSet('defaultvalue', 'defaultvalue').filterClear();
});

/*
check that filters object in state became empty
state members count should be same as on UI as no filters applied
*/

then(`I see filters reset`, () => {
  cy.reduxStore().then(currentState => {
    expect(currentState.filters).to.deep.equal({});
    cy.getMembers().should('have.length', currentState.data.length);
  });
});
