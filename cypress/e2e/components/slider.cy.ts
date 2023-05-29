const SLIDER_PREFIX = '#cds_Slider-slider';
const TRACK_ID = `${SLIDER_PREFIX}-track`;
const FILLED_ID = `${SLIDER_PREFIX}-filled`;
const THUMB_ID = `${SLIDER_PREFIX}-thumb`;

describe('Slider component test', () => {
  const initAlias = (storyName: string) => {
    cy.getStory('slider', storyName).as('slider');
    cy.get('@slider').find(TRACK_ID).as('track');
    cy.get('@slider').find(FILLED_ID).as('filled');
    cy.get('@slider').find(THUMB_ID).as('thumb');
  }

  const shouldBeEqualPercentage = (dimension: FilledDimension, position: ThumbPosition) => {
    cy.get('@filled')
      .invoke('css', dimension)
      .then(dimensionPercentage => {
        cy.get('@thumb')
          .invoke('css', position)
          .then(positionPercentage => {
            expect(dimensionPercentage).equal(positionPercentage);
        });
      });
  }

  beforeEach(() => {
    cy.visitStory('components-slider');
  });

  describe('Default slider', () => {
    beforeEach(() => {
      initAlias('default');
    })

    it('Click min value', () => {
      cy.get('@track').click('left');
      cy.get('@thumb').invoke('text').should('eq', '0');
      shouldBeEqualPercentage('width', 'left');
    });

    it('Click max value', () => {
      cy.get('@track').click('right');
      cy.get('@thumb').invoke('text').should('eq', '100');
      shouldBeEqualPercentage('width', 'left');
    });

    it('Increase with right arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 39 });
      cy.get('@thumb').invoke('text').should('eq', '51');
    });

    it('Decrease with left arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 37 });
      cy.get('@thumb').invoke('text').should('eq', '49');
    });
  });
});
