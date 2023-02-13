import { ComponentStory, ComponentMeta } from '@storybook/react';

import Typography from '.';

export default {
  title: 'Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Typography>;

const DUMMY_TEXT = '안녕하세요. 콜드스터디 디자인 시스템입니다. 🧊';

const Template: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args}>{DUMMY_TEXT}</Typography>
);

export const Title1 = Template.bind({});
Title1.args = {
  variant: 'title1',
};

export const Title2 = Template.bind({});
Title2.args = {
  variant: 'title2',
};

export const Subtitle1 = Template.bind({});
Subtitle1.args = {
  variant: 'subtitle1',
};

export const Subtitle2 = Template.bind({});
Subtitle2.args = {
  variant: 'subtitle2',
};

export const Body = Template.bind({});
Body.args = {
  variant: 'body',
};

export const Desc = Template.bind({});
Desc.args = {
  variant: 'desc',
};
