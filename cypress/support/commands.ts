/// <reference types="cypress" />

Cypress.Commands.add("visitStory", (path) => {
  cy.visit(`http://localhost:6006/?path=/docs/${path}`);
})

Cypress.Commands.add("getStory", (componentName, storyName) => {
  return cy.get("#storybook-preview-iframe").its('0.contentDocument.body').should('not.be.empty').then(body => cy.wrap(body).find(`#story--components-${componentName}--${storyName}`));
})
