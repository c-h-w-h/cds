declare namespace Cypress {
  interface Chainable {
    visitStory(componentName: string, storyName: string): void,
  }
}

type FilledDimension = 'width' | 'height';
type ThumbPosition = 'left' | 'bottom';
