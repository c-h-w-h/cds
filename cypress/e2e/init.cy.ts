describe('Initial cypress test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006');
  });

  it('First test case', () => {
    cy.get("a[title='Storybook']").should('be.visible');
  });
});
