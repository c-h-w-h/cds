declare namespace Cypress {
  interface Chainable {
    visitStory(path: string): void,
    getStory(componentName: string, storyName: string): Chainable<JQuery<HTMLElement>>
  }
}