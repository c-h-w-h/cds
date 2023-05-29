const SLIDER_TRACK_ID = '#cds_Slider-slider-track';
const SLIDER_FILLED_ID = '#cds_Slider-slider-filled';
const SLIDER_THUMB_ID = '#cds_Slider-slider-thumb';

describe('Slider component test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/?path=/docs/components-slider--default');
    cy.getStory('slider', 'default').as('slider');
    cy.get('@slider').find(SLIDER_TRACK_ID).as('track');
    cy.get('@slider').find(SLIDER_FILLED_ID).as('filled');
    cy.get('@slider').find(SLIDER_THUMB_ID).as('thumb');
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
