declare namespace Cypress {
  interface Chainable {
    getStory(componentName: string, storyName: string): Chainable<JQuery<HTMLElement>>
  }
}