import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Flexbox from '.';

export default {
  title: 'Design System/Layout/Flexbox',
  component: Flexbox,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Flexbox는 display 속성을 flex로 한 <div> 태그를 선언적으로 사용합니다.',
  },
  argTypes: {
    children: {
      name: 'children',
      description: '목록으로 표시되는 요소입니다.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    flexDirection: {
      name: 'flexDirection',
      description: '요소가 배치되는 방향을 결정합니다.',
      table: {
        type: { summary: "CSSProperties['flexDirection']" },
        defaultValue: { summary: 'row' },
      },
      control: {
        type: 'select',
        options: ['row', 'row-reverse', 'column', 'column-reverse'],
      },
    },
    flexWrap: {
      name: 'flexWrap',
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
    alignContent: {
      name: 'alignContent',
      description:
        'flex의 교차축을 따라 요소와 간격 배치 방식을 결정합니다. 줄바꿈이 일어나는 경우 적용되며 이 경우 alignItems 속성은 무시됩니다.',
      table: {
        type: { summary: "CSSProperties['alignContent']" },
        defaultValue: { summary: 'normal' },
      },
      control: {
        type: 'select',
        options: [
          'start',
          'end',
          'flex-start',
          'flex-end',
          'center',
          'normal',
          'baseline',
          'space-between',
          'space-around',
          'space-evenly',
          'stretch',
        ],
      },
    },
    alignItems: {
      name: 'alignItems',
      description: 'flex의 교차축에 대한 요소 배치 방식을 결정합니다.',
      table: {
        type: { summary: "CSSProperties['alignItems']" },
        defaultValue: { summary: 'center' },
      },
      control: {
        type: 'select',
        options: [
          'start',
          'end',
          'flex-start',
          'flex-end',
          'center',
          'normal',
          'baseline',
          'space-between',
          'space-around',
          'space-evenly',
          'stretch',
        ],
      },
    },
    justifyContent: {
      name: 'justifyContent',
      description:
        'flex의 주축을 따라 요소와 주변 공간 배치 방식을 결정합니다.',
      table: {
        type: { summary: "CSSProperties['justifyContent']" },
        defaultValue: { summary: 'center' },
      },
      control: {
        type: 'select',
        options: [
          'start',
          'end',
          'flex-start',
          'flex-end',
          'left',
          'right',
          'center',
          'normal',
          'space-between',
          'space-around',
          'space-evenly',
          'stretch',
        ],
      },
    },
    gap: {
      name: 'gap',
      description: '행과 열 사이의 간격을 설정합니다.',
      table: {
        type: { summary: "CSSProperties['gap']" },
        defaultValue: { summary: '1rem' },
      },
      control: {
        type: 'text',
      },
    },
    as: { table: { disable: true } },
    theme: { table: { disable: true } },
  },
} as ComponentMeta<typeof Flexbox>;

const Template: ComponentStory<typeof Flexbox> = (args) => {
  return (
    <Flexbox {...args}>
      <p>1</p>
      <p>🧊</p>
      <p>3</p>
      <p>🧊</p>
      <p>5</p>
      <p>🧊</p>
    </Flexbox>
  );
};

export const Default = Template.bind({});

export const Row = Template.bind({});
Row.args = {
  flexDirection: 'row',
};

Row.parameters = {
  docs: {
    storyDescription:
      'flexDirection 속성을 "row"로 설정하면 주축이 가로 방향으로 설정됩니다.',
  },
};

export const Column = Template.bind({});
Column.args = {
  flexDirection: 'column',
};

Column.parameters = {
  docs: {
    storyDescription:
      'flexDirection 속성을 "column"으로 설정하면 주축이 세로 방향으로 설정됩니다.',
  },
};

export const SpaceBetween = Template.bind({});
SpaceBetween.args = {
  justifyContent: 'space-between',
  gap: '0rem',
};

SpaceBetween.parameters = {
  docs: {
    storyDescription:
      'justifyContent를 "space-between"으로 설정하면 처음과 마지막 요소는 양끝에 배치되며 나머지 요소들이 남은 영역에 고른 간격으로 배치됩니다.',
  },
};

export const WithWrap: ComponentStory<typeof Flexbox> = (args) => {
  const narrowWidthStyle = css`
    width: 50px;
  `;

  return (
    <Flexbox css={narrowWidthStyle} {...args}>
      <p>1</p>
      <p>🧊</p>
      <p>3</p>
      <p>🧊</p>
      <p>5</p>
      <p>🧊</p>
    </Flexbox>
  );
};

WithWrap.args = {
  flexWrap: 'wrap',
  alignContent: 'center',
};

WithWrap.parameters = {
  docs: {
    storyDescription:
      'flexWrap 속성을 "wrap"으로 설정하면 지정된 너비 안에 위치할 수 없는 요소들이 줄바꿈 처리됩니다.',
  },
};
