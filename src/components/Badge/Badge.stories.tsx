import { ComponentStory, ComponentMeta } from '@storybook/react';

import Badge from '.';

export default {
  title: 'Badge',
  component: Badge,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Badge>;

const DUMMY_STRING = 'Javascript';

const Template: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args}>{DUMMY_STRING}</Badge>
);

export const FilledLarge = Template.bind({});
FilledLarge.args = {
  filled: true,
  size: 'large',
  outline: true,
};

export const FilledSmall = Template.bind({});
FilledSmall.args = {
  filled: true,
  outline: true,
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  outline: true,
};

export const Small = Template.bind({});
Small.args = {
  outline: true,
};

export const WithoutOutlineLarge = Template.bind({});
WithoutOutlineLarge.args = {
  size: 'large',
};

export const WithoutOutlineSmall = Template.bind({});
WithoutOutlineSmall.args = {};
