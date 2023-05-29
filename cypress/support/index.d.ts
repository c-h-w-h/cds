declare namespace Cypress {
  interface Chainable {
    visitStory(path: string): void,
    getStory(componentName: string, storyName: string): Chainable<JQuery<HTMLElement>>
  }
}

type FilledDimension = 'width' | 'height';
type ThumbPosition = 'left' | 'bottom';
