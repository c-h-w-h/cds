import { ComponentStory, ComponentMeta } from '@storybook/react';

import Image from '.';

export default {
  title: 'Image',
  component: Image,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Image>;

const DUMMY_SRC = 'https://picsum.photos/200/300';
const DUMMY_ALT = '테스트 이미지를 설명';

const Template: ComponentStory<typeof Image> = (args) => (
  <Image {...args} src={DUMMY_SRC} alt={DUMMY_ALT} />
);

export const SmallDefault = Template.bind({});
SmallDefault.args = {
  size: 'small',
};

export const SmallCircle = Template.bind({});
SmallCircle.args = {
  size: 'small',
  shape: 'circle',
};

export const SmallRounded = Template.bind({});
SmallRounded.args = {
  size: 'small',
  shape: 'rounded',
};

export const MediumDefault = Template.bind({});
MediumDefault.args = {
  size: 'medium',
};

export const MediumCircle = Template.bind({});
MediumCircle.args = {
  size: 'medium',
  shape: 'circle',
};

export const MediumRounded = Template.bind({});
MediumRounded.args = {
  size: 'medium',
  shape: 'rounded',
};

export const LargeDefault = Template.bind({});
LargeDefault.args = {
  size: 'large',
};

export const LargeCircle = Template.bind({});
LargeCircle.args = {
  size: 'large',
  shape: 'circle',
};

export const LargeRounded = Template.bind({});
LargeRounded.args = {
  size: 'large',
  shape: 'rounded',
};
