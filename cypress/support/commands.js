// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
  
/*
Commands for direct redux manipulation
*/
Cypress.Commands.add("filterClear", () => {
    cy.window().its('store').invoke('dispatch', { type: 'CLEAR_FILTERS'})
})
  
Cypress.Commands.add("filterSet", (name = null, city = null) => {
    name = name !== '<name>' ? name : null
    city = city !== '<name>' ? city : null
    cy.window().its('store').invoke('dispatch', { type: 'SET_FILTERS', payload: { city:city, name:name }})
})

Cypress.Commands.add("hiringStageSet", (uuid, hiringStage) => {
    cy.window().its('store').invoke('dispatch', { type: 'SET_STAGE', payload: { uuid:uuid, hiringStage:hiringStage }})
})

Cypress.Commands.add("reduxStore", () => {
    cy.window().its('store').invoke('getState')
})

/*
  commands to check actions binded to UI
  */
 Cypress.Commands.add("getMembers", () => {
    cy.get(`.CrewMember-container`)
})

Cypress.Commands.add("getMembersByState", (state) => {
    const hiringStates = cy.fixture('hiringStates').as('states')
    cy.get(`.App-container > :nth-child(${hiringStates.indexOf(state)})`)
})

Cypress.Commands.add("filtersAdd", (name, city) => {
  cy.get('#filters #name').type(name)
  cy.get('#filters #city').type(city)
  cy.get('#filters [type="submit"]').click()
})

Cypress.Commands.add("filtersClear", () => {
  cy.get('#filters [type="button"]').click()
})

// Measure webpage performance
Cypress.on('window:before:load', (win) => {
    win.performance.mark('start')
  })

// overwrite 'visit' command as interceptor for webpage loading performance measurement 
Cypress.Commands.overwrite("visit", (originalVisit, url, options) => {
    const opts = Cypress._.merge(options, {
      onLoad: (win) => {
        const perf = win.performance
        perf.mark('end')
        perf.measure('load', 'start', 'end')
        const measure = perf.getEntriesByName('load', 'measure')[0]
        console.log('new measure', measure)
        measures.push(measure)
      }
    })
    return originalVisit(url, opts)
  })
  
const measures = []
  
before(() => {
    measures.length = 0
})
  
after(function saveMeasures () {
    if (measures.length > 0) {
        let sum = 0
        measures.forEach(measure => {
            cy.log(`Page loaded in ${measure.duration.toFixed(2)} ms`)
            sum += Number(measure.duration)
        })
        let avg = sum / measures.length
        cy.log(`Average loading time is ${avg.toFixed(2)} ms`)
    }
    return cy.task('saveMeasures', measures)
})

