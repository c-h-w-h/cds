import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import List from '.';

export default {
  title: 'Layout/List',
  component: List,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'List는 하위에 <li> 태그로 된 children들을 목록 형태로 표시하는 <ul> 태그 역할을 합니다.',
  },
  argTypes: {
    children: {
      description: '목록으로 표시되는 요소입니다.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    flexDirection: {
      description: '요소가 배치되는 방향을 결정합니다.',
      table: {
        type: { summary: "CSSProperties['flexDirection']" },
        defaultValue: { summary: 'column' },
      },
      control: {
        type: 'select',
        options: ['row', 'row-reverse', 'column', 'column-reverse'],
      },
    },
    flexWrap: {
      description: '줄바꿈 속성을 설정합니다.',
      table: {
        type: { summary: "CSSProperties['flexWrap']" },
        defaultValue: { summary: 'nowrap' },
      },
      control: {
        type: 'select',
        options: ['wrap', 'wrap-reverse', 'nowrap'],
      },
    },
    css: { table: { disable: true } },
    alignContent: { table: { disable: true } },
    alignItems: { table: { disable: true } },
    justifyContent: { table: { disable: true } },
    gap: { table: { disable: true } },
  },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => {
  return (
    <List {...args}>
      <li>1</li>
      <li>🧊</li>
      <li>3</li>
      <li>🧊</li>
      <li>5</li>
      <li>🧊</li>
    </List>
  );
};

export const Default = Template.bind({});

export const Column = Template.bind({});
Column.args = {};

Column.parameters = {
  docs: {
    storyDescription:
      'flexDirection을 설정하지 않거나 "column"일 경우 목록이 세로 방향으로 배치됩니다.',
  },
};

export const Row = Template.bind({});
Row.args = {
  flexDirection: 'row',
};

Row.parameters = {
  docs: {
    storyDescription:
      'flexDirection이 "row"일 경우 목록이 가로 방향으로 배치됩니다.',
  },
};

export const WithWrap = Template.bind({});
WithWrap.args = {
  flexWrap: 'wrap',
  css: [
    css`
      height: 100px;
    `,
  ],
};

WithWrap.parameters = {
  docs: {
    storyDescription:
      'flexWrap 속성을 "wrap"으로 설정하여 제한된 높이 안에서 다중 목록을 표현할 수 있습니다.',
  },
};
