import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdCelebration } from 'react-icons/md';

import Button from '.';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  icon: MdCelebration,
  text: '상장하기',
};

export const Link = Template.bind({});
Link.args = {
  icon: MdCelebration,
  text: '상장하기',
  href: 'http://localhost:6006/?path=/story/button--link',
};

export const IconRight = Template.bind({});
IconRight.args = {
  icon: MdCelebration,
  text: '상장하기',
  iconPosition: 'right',
  iconTranslateY: '-2px',
};

export const IconInUrl = Template.bind({});
IconInUrl.args = {
  icon: 'https://user-images.githubusercontent.com/63814960/220829587-f305856c-b7bc-4dd0-a199-40735c9da5dc.png',
  iconSize: '500px',
  text: '상장하기',
  iconTranslateY: '-1px',
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  icon: MdCelebration,
};

export const TextOnly = Template.bind({});
TextOnly.args = {
  text: '상장하기',
};

export const Light = Template.bind({});
Light.args = {
  icon: MdCelebration,
  text: '상장하기',
  variant: 'light',
};

export const Square = Template.bind({});
Square.args = {
  icon: MdCelebration,
  text: '상장하기',
  variant: 'square',
};

export const SquareLight = Template.bind({});
SquareLight.args = {
  icon: MdCelebration,
  text: '상장하기',
  variant: 'square light',
};

export const SquareIconOnly = Template.bind({});
SquareIconOnly.args = {
  icon: MdCelebration,
  variant: 'square',
};
