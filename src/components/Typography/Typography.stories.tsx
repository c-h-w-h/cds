import { useTheme } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Highlight from './Highlight';

import Typography from '.';

export default {
  title: 'Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => {
  const { color } = useTheme();
  const { black } = color;

  return (
    <Typography color={black} {...args}>
      안녕하세요. 콜드스터디 디자인 시스템입니다. 🧊
    </Typography>
  );
};

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

export const Title1WithColor = Template.bind({});
Title1WithColor.args = {
  variant: 'title1',
  color: 'blue',
};

export const Title1Highlighted: ComponentStory<typeof Typography> = () => {
  const { color } = useTheme();
  const { black } = color;

  return (
    <Typography variant="title1" color={black}>
      안녕하세요. <Highlight>콜드스터디</Highlight> 디자인 시스템입니다. 🧊
    </Typography>
  );
};

export const Title1CustomHighlighted: ComponentStory<typeof Typography> =
  () => {
    const { color } = useTheme();
    const { black } = color;

    return (
      <Typography variant="title1" color={black}>
        안녕하세요. <Highlight color="blue">콜드스터디</Highlight> 디자인
        시스템입니다. 🧊
      </Typography>
    );
  };
