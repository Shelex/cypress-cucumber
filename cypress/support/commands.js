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

import lodash for some array filter\search

*/
const { _ } = Cypress;

/*
Dispatch CLEAR_FILTERS event
*/

Cypress.Commands.add('filterClear', () => {
  cy.window()
    .its('store')
    .invoke('dispatch', { type: 'CLEAR_FILTERS' });
});

/*
  Dispatch SET_FILTERS event
*/

Cypress.Commands.add('filterSet', (name = null, city = null) => {
  name = name === '<name>' ? null : name;
  city = city === '<name>' ? null : city;
  cy.window()
    .its('store')
    .invoke('dispatch', {
      type: 'SET_FILTERS',
      payload: { city: city, name: name }
    });
});

/*
  Dispatch SET_Stage event
*/

Cypress.Commands.add('hiringStageSet', (uuid, hiringStage) => {
  cy.window()
    .its('store')
    .invoke('dispatch', {
      type: 'SET_STAGE',
      payload: { uuid: uuid, hiringStage: hiringStage }
    });
});

/*
  Get current state
*/

Cypress.Commands.add('reduxStore', () => {
  cy.window()
    .its('store')
    .invoke('getState');
});

/*
  Get member's cards
*/

Cypress.Commands.add('getMembers', () => {
  cy.get(`.CrewMember-container`);
});

/*
  Get number of users by stage column
*/

Cypress.Commands.add('getMembersByStage', stage => {
  cy.fixture('hiringStages')
    .as('stages')
    .then(stages => {
      let selector = `.App-container > :nth-child(${stages[stage]}) > div`;
      cy.get(selector)
        .children()
        .its('length');
    });
});

/*
util commands for data filtering (search users in storage by filters or uuid)
*/

Cypress.Commands.add('getMemberByUuid', (storage, uuid) => {
  return _.find(storage.data, o => {
    return o.login.uuid === uuid;
  });
});

Cypress.Commands.add('getMembersByFilters', (storage, dispatchBody) => {
  return _.filter(storage.data, function(o) {
    return (
      (o.name.first.includes(dispatchBody.name) ||
        o.name.last.includes(dispatchBody.name)) &&
      o.location.city.includes(dispatchBody.city)
    );
  });
});

// Measure webpage performance
Cypress.on('window:before:load', win => {
  win.performance.mark('start');
});

// overwrite 'visit' command as interceptor for webpage loading performance measurement
Cypress.Commands.overwrite('visit', (originalVisit, url, options) => {
  const opts = Cypress._.merge(options, {
    onLoad: win => {
      const perf = win.performance;
      perf.mark('end');
      perf.measure('load', 'start', 'end');
      const measure = perf.getEntriesByName('load', 'measure')[0];
      // eslint-disable-next-line no-console
      console.log('new measure', measure);
      measures.push(measure);
    }
  });
  return originalVisit(url, opts);
});

const measures = [];

before(() => {
  measures.length = 0;
});

/*
Add measures table to first test logs,
then fire task which will show table in final report
*/

after(function saveMeasures() {
  if (measures.length > 0) {
    measures.forEach(measure => {
      cy.log(`Page loaded in ${measure.duration.toFixed(2)} ms`);
    });
  }
  return cy.task('saveMeasures', measures);
});
