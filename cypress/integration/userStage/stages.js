when('I change stage for {string} to {word}', (uuid, stage) => {
  cy.reduxStore().then(initialState => {
    cy.getMemberByUuid(initialState, uuid)
      .as('memberInitData')
      .its('hiringStage')
      .then(initHiringStage => {
        cy.wrap(initHiringStage).as('oldStage');
        cy.getMembersByStage(initHiringStage).as('oldStageMembersCountInit');
        cy.getMembersByStage(stage).as('newStageMembersCountInit');
      });
  });
  cy.hiringStageSet(uuid, stage)
    .its('payload')
    .as('dispatchBody');
});

/*
Get current state, check that member has stage from event applied
Get members from old stage and new stage columns, compare initial and current members count
*/

then('I see member stage changed to {word}', newStage => {
  cy.reduxStore().then(currentState => {
    cy.get('@dispatchBody').then(dispatchBody => {
      cy.getMemberByUuid(currentState, dispatchBody.uuid)
        .as('memberCurrentData')
        .its('hiringStage')
        .should('be.eq', newStage);
      cy.getMembersByStage(newStage).then(newStageMembersCountNow => {
        cy.get('@oldStage').then(oldStage => {
          cy.getMembersByStage(oldStage).then(oldStageMembersCountNow => {
            cy.get('@newStageMembersCountInit').then(
              newStageMembersCountInit => {
                if (oldStage === newStage) {
                  expect(newStageMembersCountNow).to.eq(
                    newStageMembersCountInit
                  );
                } else {
                  expect(newStageMembersCountNow).to.eq(
                    newStageMembersCountInit + 1
                  );
                  cy.get('@oldStageMembersCountInit').should(
                    'be.eq',
                    oldStageMembersCountNow + 1
                  );
                }
              }
            );
          });
        });
      });
    });
  });
});
