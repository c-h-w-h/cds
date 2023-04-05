import { ComponentStory, ComponentMeta } from '@storybook/react';

import Spinner from '.';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Spinner는 특정 작업이 완료되거나 표시할 값이 준비될 때까지 사용자가 기다리도록 피드백을 줍니다.',
  },
  argTypes: {
    size: {
      description: 'Spinner의 크기를 결정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'small' },
      },
      control: {
        type: 'select',
        options: ['small', 'large'],
      },
    },
  },
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const Default = Template.bind({});

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

Small.parameters = {
  docs: {
    storyDescription: '작은 크기의 Spinner입니다.',
  },
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

Large.parameters = {
  docs: {
    storyDescription: '큰 크기의 Spinner입니다.',
  },
};
