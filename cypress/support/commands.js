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
const { _ } = Cypress

/*
Commands for direct state manipulation
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
  commands to fetch UI data
*/
Cypress.Commands.add("getMembers", () => {
    cy.get(`.CrewMember-container`)
})

Cypress.Commands.add("getMembersByStage", (stage) => {
    cy.fixture('hiringStages').as('stages')
    .get('@stages').then((stages) => {
        let selector = `.App-container > :nth-child(${stages[stage]}) > div`
        cy.get(selector).children().its('length')
    })  
})

// util commands for data filtering

Cypress.Commands.add("getMemberFromStorageByUuid", (storage, uuid) => {
    return _.find(storage.data, (o) => { return o.login.uuid == uuid })
})

Cypress.Commands.add("getMembersByFilters", (storage, dispatchBody) => {
    return _.filter(storage.data, function(o) {
        return `${o.name.first} ${o.name.last}`.includes(dispatchBody.name) && o.location.city.includes(dispatchBody.city)
    })
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

