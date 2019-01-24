const {When, Then} = require('cypress-cucumber-preprocessor/steps')

When (`I change stage for {string} to {string}`, (uuid, stage) => {
    cy.reduxStore().then((initialState) => {
        cy.getMemberByUuid(initialState, uuid).as('memberInitData')
        .get('@memberInitData').its('hiringStage').then((initHiringStage) => {
            cy.wrap(initHiringStage).as('oldStage')
            .getMembersByStage(initHiringStage).as('oldStageMembersCountInit')
            .getMembersByStage(stage).as('newStageMembersCountInit')
        })
    })
    cy.hiringStageSet(uuid, stage).its('payload').as('dispatchBody')
})


/*
Get current state, check that member has stage from event applied
Get members from old stage and new stage columns, compare initial and current members count
*/

Then (`I see member stage changed to {string}`, (newStage) => {
    cy.reduxStore().then((currentState) => {
        cy.get('@dispatchBody').then((dispatchBody) => {
            cy.getMemberByUuid(currentState, dispatchBody.uuid).as('memberCurrentData')
            .get('@memberCurrentData').then((currentMember) => {
                expect(currentMember.hiringStage).to.eq(newStage)
            })
            .getMembersByStage(newStage).then((newStageMembersCountNow) => {
                cy.get('@oldStage').then((oldStage) => {
                    cy.getMembersByStage(oldStage).then((oldStageMembersCountNow) => {
                            cy.get('@newStageMembersCountInit').then((newStageMembersCountInit) => {
                                if (oldStage !== newStage) {
                                    expect(newStageMembersCountNow).to.eq(newStageMembersCountInit + 1)
                                    cy.get('@oldStageMembersCountInit').then((oldStageMembersCountInit) => {
                                    expect(oldStageMembersCountNow).to.eq(oldStageMembersCountInit - 1) 
                                    })
                                } else {
                                    expect(newStageMembersCountNow).to.eq(newStageMembersCountInit) 
                                }            
                        })                  
                    })
                })
            })
        })
    })
})