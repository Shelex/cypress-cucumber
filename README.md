# CREW APPLICATION
[![Cypress](https://img.shields.io/badge/cypress-dashboard-brightgreen.svg)](https://dashboard.cypress.io/#/projects/48xoji/runs)
[![CircleCI](https://circleci.com/gh/Shelex/cypress-cucumber/tree/master.svg?style=svg)](https://circleci.com/gh/Shelex/cypress-cucumber/tree/master)  
Simple application which represents dashboard with candidates.  

### Running locally
`yarn install`

`yarn start`

App will be available on http://localhost:3000


### Running in docker
`docker build -t crew-app .`

`docker run -it --rm -p 5000:5000 --name crew-container crew-app`

App will be available on http://localhost:5000

### Cypress-cucumber e2e tests

Tests are located in `/cypress` folder  
Feature files are in in `/cypress/integration` following the [Cypress Cucumber Preprocessor Style](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/blob/master/README.md#step-definitions) with step definitions located in same folder with name of feature.  

Step definitions are following the basic implementation of [Application Actions pattern](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/#Application-actions) proposed by cypress developers, manipulating redux state directly from `/cypress/support/commands` without PageObject layer or UI selectors stored as fixtures.  

Added [performance mark](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API) for page loading measures  

### Running tests locally

To run in terminal:  
`yarn cypress:chrome`  
`yarn cypress:electron`  

To open Cypress GUI:  
`yarn cypress:open`

### Running tests in docker

`docker-compose run cypress yarn cypress:chrome`  
`docker-compose run cypress yarn cypress:electron`  

### Running in CircleCI 2.0

Tests are run after commit hook
