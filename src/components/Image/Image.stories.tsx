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

export const SmallDefaultImage = Template.bind({});
SmallDefaultImage.args = {
  size: 'small',
};

export const SmallCircleImage = Template.bind({});
SmallCircleImage.args = {
  size: 'small',
  shape: 'circle',
};

export const SmallRoundedImage = Template.bind({});
SmallRoundedImage.args = {
  size: 'small',
  shape: 'rounded',
};

export const MediumDefaultImage = Template.bind({});
MediumDefaultImage.args = {
  size: 'medium',
};

export const MediumCircleImage = Template.bind({});
MediumCircleImage.args = {
  size: 'medium',
  shape: 'circle',
};

export const MediumRoundedImage = Template.bind({});
MediumRoundedImage.args = {
  size: 'medium',
  shape: 'rounded',
};

export const LargeDefaultImage = Template.bind({});
LargeDefaultImage.args = {
  size: 'large',
};

export const LargeCircleImage = Template.bind({});
LargeCircleImage.args = {
  size: 'large',
  shape: 'circle',
};

export const LargeRoundedImage = Template.bind({});
LargeRoundedImage.args = {
  size: 'large',
  shape: 'rounded',
};
