/// <reference types="cypress" />

Cypress.Commands.add("visitStory", (componentName, storyName) => {
  cy.visit(`http://localhost:6006/iframe.html?id=components-${componentName}--${storyName}&viewMode=story`)
})
