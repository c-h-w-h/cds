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

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};
