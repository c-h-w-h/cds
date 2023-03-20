import { ComponentStory, ComponentMeta } from '@storybook/react';

import Spacing from '.';

export default {
  title: 'Spacing',
  component: Spacing,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Spacing>;

const DUMMY_TEXT1 = '첫 번째 더미 요소';
const DUMMY_TEXT2 = '두 번째 더미 요소';

const Template: ComponentStory<typeof Spacing> = (args) => (
  <>
    <div>{DUMMY_TEXT1}</div>
    <Spacing {...args} />
    <div>{DUMMY_TEXT2}</div>
  </>
);

export const Size_5 = Template.bind({});
Size_5.args = {
  size: 5,
};

export const Size_10 = Template.bind({});
Size_10.args = {
  size: 10,
};

export const Size_15 = Template.bind({});
Size_15.args = {
  size: 15,
};

export const Size_20 = Template.bind({});
Size_20.args = {
  size: 20,
};

export const Size_30 = Template.bind({});
Size_30.args = {
  size: 30,
};

export const Size_40 = Template.bind({});
Size_40.args = {
  size: 40,
};

export const Size_60 = Template.bind({});
Size_60.args = {
  size: 60,
};

export const Size_80 = Template.bind({});
Size_80.args = {
  size: 80,
};

export const Size_100 = Template.bind({});
Size_100.args = {
  size: 100,
};
