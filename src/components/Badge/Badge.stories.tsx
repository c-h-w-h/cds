import Flexbox from '@components-layout/Flexbox';
import { COLOR } from '@constants/color';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Badge from '.';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Badge는 작은 숫자나 상태를 설명하는 데에 사용되는 컴포넌트입니다.',
  },
  argTypes: {
    children: {
      description: 'Badge에 표시할 글자를 설정합니다.',
      table: {
        type: { summary: 'string', required: true },
      },
      control: {
        type: 'text',
      },
    },
    size: {
      description: 'Badge 크기를 결정합니다.',
      table: {
        type: { summary: 'BadgeSize' },
        defaultValue: { summary: 'small' },
      },
      control: {
        type: 'radio',
        options: ['small', 'large'],
      },
    },
    outline: {
      description: '테두리 선의 유무를 결정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    color: {
      description: '테두리 혹은 배경의 색상을 설정합니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    filled: {
      description: '배경 색상의 유무를 결정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args}></Badge>
);

export const Default = Template.bind({});
Default.args = {
  filled: true,
  outline: true,
  size: 'small',
  children: 'Javascript',
  color: COLOR.primary,
};

export const WithOutline = Template.bind({});
WithOutline.args = {
  outline: true,
  children: 'Javascript',
};

WithOutline.parameters = {
  docs: {
    storyDescription:
      'outline 속성을 true로 설정하면 테두리를 표시할 수 있습니다.',
  },
};

export const WithColor = Template.bind({});
WithColor.args = {
  color: COLOR.error,
  outline: true,
  children: 'Javascript',
};

WithColor.parameters = {
  docs: {
    storyDescription: 'color props를 통해 색상을 변경할 수 있습니다.',
  },
};

export const WithFilled = Template.bind({});
WithFilled.args = {
  filled: true,
  children: 'Javascript',
};

WithFilled.parameters = {
  docs: {
    storyDescription:
      'filled 속성을 true로 설정하면 배경 색상을 표시할 수 있습니다.',
  },
};

export const SizeVariant: ComponentStory<typeof Badge> = () => {
  return (
    <Flexbox>
      <Badge size="small" outline={true}>
        Javascript
      </Badge>
      <Badge size="large" outline={true}>
        Javascript
      </Badge>
    </Flexbox>
  );
};

SizeVariant.parameters = {
  docs: {
    storyDescription:
      'size 속성으로 Badge 크기를 조절할 수 있습니다. 좌측부터 차례로 small, large 크기입니다.',
  },
};
