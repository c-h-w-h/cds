import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RangeSelector } from '.';

export default {
  title: 'RangeSelector',
  component: RangeSelector,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof RangeSelector>;

const DEFAULT_PROPS = {
  id: 'default',
  label: 'Primitive 슬라이더',
};

const Template: ComponentStory<typeof RangeSelector> = (args) => (
  <RangeSelector {...args} {...DEFAULT_PROPS}>
    <RangeSelector.Slider />
    <RangeSelector.RangeDisplay />
  </RangeSelector>
);

export const StartFromZero = Template.bind({});
StartFromZero.args = {
  min: 0,
  max: 100,
  init: 0,
  size: 200,
};

export const StartFromHalf = Template.bind({});
StartFromHalf.args = {
  min: 0,
  max: 100,
  init: 50,
  size: 200,
};

export const StartFromEnd = Template.bind({});
StartFromEnd.args = {
  min: 0,
  max: 100,
  init: 100,
  size: 200,
};

export const MinValueVariant = Template.bind({});
MinValueVariant.args = {
  min: 50,
  max: 100,
  init: 75,
  size: 200,
};

export const MaxValueVariant = Template.bind({});
MaxValueVariant.args = {
  min: 50,
  max: 200,
  init: 100,
  size: 200,
};

export const SizeVariant = Template.bind({});
SizeVariant.args = {
  min: 0,
  max: 100,
  init: 50,
  size: 500,
};
