import { ComponentStory, ComponentMeta } from '@storybook/react';

import Spinner from '.';

export default {
  title: 'Spinner',
  component: Spinner,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const SmallSpinner = Template.bind({});
SmallSpinner.args = {
  size: 'small',
};

export const LargeSpinner = Template.bind({});
LargeSpinner.args = {
  size: 'large',
};
