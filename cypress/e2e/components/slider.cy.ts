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
    cy.get('@filled').then(([ filledElement ]) => {
      cy.get('@thumb').then(([ thumbElement ]) => {
        const filledStyle = window.getComputedStyle(filledElement)[dimension];
        const thumbStyle = window.getComputedStyle(thumbElement)[position];
        expect(filledStyle).equal(thumbStyle);
      });
    });
  }

  beforeEach(() => {
    cy.visitStory('components-slider');
  });

  describe('Default slider', () => {
    beforeEach(() => {
      initAlias('default');
    });

    afterEach(() => {
      shouldBeEqualPercentage('width', 'left');
    });

    it('Click min value', () => {
      cy.get('@track').click('left');
      cy.get('@thumb').invoke('text').should('eq', '0');
    });

    it('Click max value', () => {
      cy.get('@track').click('right');
      cy.get('@thumb').invoke('text').should('eq', '100');
    });

    it('Increase with right arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 39 });
      cy.get('@thumb').invoke('text').should('eq', '51');
    });

    it('Increase with up arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 38 });
      cy.get('@thumb').invoke('text').should('eq', '51');
    });

    it('Decrease with left arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 37 });
      cy.get('@thumb').invoke('text').should('eq', '49');
    });

    it('Decrease with down arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 40 });
      cy.get('@thumb').invoke('text').should('eq', '49');
    });

    it('Increase with page up', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 33 });
      cy.get('@thumb').invoke('text').should('eq', '60');
    });

    it('Decrease with page down', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 34 });
      cy.get('@thumb').invoke('text').should('eq', '40');
    });

    it('Set min with home key', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 36 });
      cy.get('@thumb').invoke('text').should('eq', '0');
    });

    it('Set max with end key', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 35 });
      cy.get('@thumb').invoke('text').should('eq', '100');
    });
  });

  describe('Start From Zero slider', () => {
    beforeEach(() => {
      initAlias('start-from-zero');
    });

    afterEach(() => {
      shouldBeEqualPercentage('width', 'left');
    });

    it('Decrease with left arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 37 });
      cy.get('@thumb').invoke('text').should('eq', '0');
    });

    it('Decrease with down arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 40 });
      cy.get('@thumb').invoke('text').should('eq', '0');
    });

    it('Decrease with page down', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 34 });
      cy.get('@thumb').invoke('text').should('eq', '0');
    });
  });

  describe('Start From End slider', () => {
    beforeEach(() => {
      initAlias('start-from-end');
    });

    afterEach(() => {
      shouldBeEqualPercentage('width', 'left');
    });

    it('Increase with right arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 39 });
      cy.get('@thumb').invoke('text').should('eq', '100');
    });

    it('Increase with up arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 38 });
      cy.get('@thumb').invoke('text').should('eq', '100');
    });

    it('Increase with page up', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 33 });
      cy.get('@thumb').invoke('text').should('eq', '100');
    });
  });

  describe('Min Value Variant slider', () => {
    beforeEach(() => {
      initAlias('min-value-variant');
    });

    afterEach(() => {
      shouldBeEqualPercentage('width', 'left');
    });

    it('Click min value', () => {
      cy.get('@track').click('left');
      cy.get('@thumb').invoke('text').should('eq', '50');
    });

    it('Click max value', () => {
      cy.get('@track').click('right');
      cy.get('@thumb').invoke('text').should('eq', '100');
    });

    it('Increase with right arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 39 });
      cy.get('@thumb').invoke('text').should('eq', '76');
    });

    it('Increase with up arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 38 });
      cy.get('@thumb').invoke('text').should('eq', '76');
    });

    it('Decrease with left arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 37 });
      cy.get('@thumb').invoke('text').should('eq', '74');
    });

    it('Decrease with down arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 40 });
      cy.get('@thumb').invoke('text').should('eq', '74');
    });

    it('Increase with page up', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 33 });
      cy.get('@thumb').invoke('text').should('eq', '80');
    });

    it('Decrease with page down', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 34 });
      cy.get('@thumb').invoke('text').should('eq', '70');
    });

    it('Set min with home key', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 36 });
      cy.get('@thumb').invoke('text').should('eq', '50');
    });

    it('Set max with end key', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 35 });
      cy.get('@thumb').invoke('text').should('eq', '100');
    });
  });

  describe('Max Value Variant slider', () => {
    beforeEach(() => {
      initAlias('max-value-variant');
    });

    afterEach(() => {
      shouldBeEqualPercentage('width', 'left');
    });

    it('Click min value', () => {
      cy.get('@track').click('left');
      cy.get('@thumb').invoke('text').should('eq', '50');
    });

    it('Click max value', () => {
      cy.get('@track').click('right');
      cy.get('@thumb').invoke('text').should('eq', '200');
    });

    it('Increase with right arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 39 });
      cy.get('@thumb').invoke('text').should('eq', '101');
    });

    it('Increase with up arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 38 });
      cy.get('@thumb').invoke('text').should('eq', '101');
    });

    it('Decrease with left arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 37 });
      cy.get('@thumb').invoke('text').should('eq', '99');
    });

    it('Decrease with down arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 40 });
      cy.get('@thumb').invoke('text').should('eq', '99');
    });

    it('Increase with page up', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 33 });
      cy.get('@thumb').invoke('text').should('eq', '115');
    });

    it('Decrease with page down', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 34 });
      cy.get('@thumb').invoke('text').should('eq', '85');
    });

    it('Set min with home key', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 36 });
      cy.get('@thumb').invoke('text').should('eq', '50');
    });

    it('Set max with end key', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 35 });
      cy.get('@thumb').invoke('text').should('eq', '200');
    });
  });

  describe('With Step 10 slider', () => {
    beforeEach(() => {
      initAlias('with-step-10');
    });

    afterEach(() => {
      shouldBeEqualPercentage('width', 'left');
    });

    it('Increase with right arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 39 });
      cy.get('@thumb').invoke('text').should('eq', '60');
    });

    it('Increase with up arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 38 });
      cy.get('@thumb').invoke('text').should('eq', '60');
    });

    it('Decrease with left arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 37 });
      cy.get('@thumb').invoke('text').should('eq', '40');
    });

    it('Decrease with down arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 40 });
      cy.get('@thumb').invoke('text').should('eq', '40');
    });

    it('Increase with page up', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 33 });
      cy.get('@thumb').invoke('text').should('eq', '60');
    });

    it('Decrease with page down', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 34 });
      cy.get('@thumb').invoke('text').should('eq', '40');
    });
  });

  describe('With Step 20 slider', () => {
    beforeEach(() => {
      initAlias('with-step-20');
    });

    afterEach(() => {
      shouldBeEqualPercentage('width', 'left');
    });

    it('Increase with right arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 39 });
      cy.get('@thumb').invoke('text').should('eq', '70');
    });

    it('Increase with up arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 38 });
      cy.get('@thumb').invoke('text').should('eq', '70');
    });

    it('Decrease with left arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 37 });
      cy.get('@thumb').invoke('text').should('eq', '30');
    });

    it('Decrease with down arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 40 });
      cy.get('@thumb').invoke('text').should('eq', '30');
    });

    it('Increase with page up', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 33 });
      cy.get('@thumb').invoke('text').should('eq', '60');
    });

    it('Decrease with page down', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 34 });
      cy.get('@thumb').invoke('text').should('eq', '40');
    });
  });

  describe('With Vertical Orientation slider', () => {
    beforeEach(() => {
      initAlias('with-vertical-orientation');
    });

    afterEach(() => {
      shouldBeEqualPercentage('height', 'bottom');
    });

    it('Click min value', () => {
      cy.get('@track').click(0, 200, { force: true });
      cy.get('@thumb').invoke('text').should('eq', '0');
    });

    it('Click max value', () => {
      cy.get('@track').click('top');
      cy.get('@thumb').invoke('text').should('eq', '100');
    });

    it('Increase with right arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 39 });
      cy.get('@thumb').invoke('text').should('eq', '51');
    });

    it('Increase with up arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 38 });
      cy.get('@thumb').invoke('text').should('eq', '51');
    });

    it('Decrease with left arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 37 });
      cy.get('@thumb').invoke('text').should('eq', '49');
    });

    it('Decrease with down arrow', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 40 });
      cy.get('@thumb').invoke('text').should('eq', '49');
    });

    it('Increase with page up', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 33 });
      cy.get('@thumb').invoke('text').should('eq', '60');
    });

    it('Decrease with page down', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 34 });
      cy.get('@thumb').invoke('text').should('eq', '40');
    });

    it('Set min with home key', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 36 });
      cy.get('@thumb').invoke('text').should('eq', '0');
    });

    it('Set max with end key', () => {
      cy.get("@thumb").trigger('keydown', { keyCode : 35 });
      cy.get('@thumb').invoke('text').should('eq', '100');
    });
  });
});
