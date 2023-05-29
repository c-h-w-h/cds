const SLIDER_PREFIX = '#cds_Slider-slider';
const TRACK_ID = `${SLIDER_PREFIX}-track`;
const FILLED_ID = `${SLIDER_PREFIX}-filled`;
const THUMB_ID = `${SLIDER_PREFIX}-thumb`;

describe('Slider component test', () => {
  beforeEach(() => {
    cy.visitStory('components-slider');
    cy.getStory('slider', 'default').as('slider');
    cy.get('@slider').find(TRACK_ID).as('track');
    cy.get('@slider').find(FILLED_ID).as('filled');
    cy.get('@slider').find(THUMB_ID).as('thumb');
  });

  describe('Default slider', () => {
    it('Click min value', () => {
      cy.get('@track').click('left');
      cy.get('@thumb').invoke('text').should('eq', '0');  
    });

    it('Click max value', () => {
      cy.get('@track').click('right');
      cy.get('@thumb').invoke('text').should('eq', '100');  
    });
  });
});
