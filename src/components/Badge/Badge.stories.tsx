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

export const FilledLargeBadge = Template.bind({});
FilledLargeBadge.args = {
  filled: true,
  size: 'large',
  outline: true,
};

export const FilledSmallBadge = Template.bind({});
FilledSmallBadge.args = {
  filled: true,
  outline: true,
};

export const LargeBadge = Template.bind({});
LargeBadge.args = {
  size: 'large',
  outline: true,
};

export const SmallBadge = Template.bind({});
SmallBadge.args = {
  outline: true,
};

export const WithoutOutlineLargeBadge = Template.bind({});
WithoutOutlineLargeBadge.args = {
  size: 'large',
};

export const WithoutOutlineSmallBadge = Template.bind({});
WithoutOutlineSmallBadge.args = {};
