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
        measures.forEach(measure => {
            cy.log(`Page loaded in ${measure.duration.toFixed(2)} ms`)
        })
    }
    return cy.task('saveMeasures', measures)
})

