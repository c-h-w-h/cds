import { ComponentStory, ComponentMeta } from '@storybook/react';

import Center from '.';

export default {
  title: 'Layout/Center',
  component: Center,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: 'Center는 하위에 있는 children들을 가운데로 정렬합니다.',
  },
  argTypes: {
    children: {
      description: '중앙에 위치시키고자 하는 요소입니다.',
      table: {
        type: { summary: 'ReactNode' },
      },
      control: {
        type: 'select',
        options: {
          WithChild: <p>안녕하세요</p>,
          WithChildren: (
            <div>
              <div>차가운</div>
              <div>디자인</div>
              <div>시스템이에요</div>
            </div>
          ),
        },
      },
    },
  },
} as ComponentMeta<typeof Center>;

const Template: ComponentStory<typeof Center> = (args) => {
  return <Center>{args.children}</Center>;
};

export const Default = Template.bind({});
Default.args = {
  children: 'Cold Design System',
};

export const WithChild = Template.bind({});
WithChild.args = {
  children: <p>안녕하세요</p>,
};

WithChild.parameters = {
  docs: {
    storyDescription: 'children에 하나의 요소가 존재하는 경우입니다.',
  },
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  children: (
    <div>
      <div>차가운</div>
      <div>디자인</div>
      <div>시스템이에요</div>
    </div>
  ),
};

WithChildren.parameters = {
  docs: {
    storyDescription: 'children에 여러 요소가 존재하는 경우입니다.',
  },
};
