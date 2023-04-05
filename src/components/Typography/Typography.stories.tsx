import { ComponentStory, ComponentMeta } from '@storybook/react';

import Highlight from './Highlight';

import Typography from '.';

export default {
  title: 'Design System/Components/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Typography는 텍스트의 역할에 따라 다양한 폰트 크기와 굵기를 설정할 수 있습니다.',
    docs: {
      description: {
        component:
          `- variant 값으로 "title1" | "title2" | "subtitle1" | "subtitle2" | "body" | "desc" 를 사용할 수 있습니다. \n` +
          `- 텍스트 부분 하이라이팅을 위해 \\<Highlight\\> 컴포넌트를 함께 사용할 수 있습니다.`,
      },
    },
  },
  argTypes: {
    variant: {
      description: '텍스트 역할을 선택합니다.',
      table: {
        type: { summary: 'TypographyVariant' },
        defaultValue: { summary: 'body' },
        category: 'Typography',
      },
      control: {
        type: 'select',
        options: ['title1', 'title2', 'subtitle1', 'subtitle2', 'body', 'desc'],
      },
    },
    children: {
      description:
        'Typography로 나타낼 글 내용입니다. 문자로 평가되는 모든 노드가 올 수 있습니다.',
      table: {
        type: { summary: 'string' },
        category: ['Typography', 'Highlight'],
      },
    },
    color: {
      description: '텍스트 색상을 지정합니다.',
      table: {
        type: { summary: "CSSProperties['color']" },
        defaultValue: { summary: 'inherit' },
        category: ['Typography', 'Highlight'],
      },
      control: {
        type: 'color',
      },
    },
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => {
  return (
    <Typography {...args}>안녕하세요. 콜드 디자인 시스템입니다. 🧊</Typography>
  );
};

export const Default = Template.bind({});

export const Title1 = Template.bind({});
Title1.args = {
  variant: 'title1',
};

Title1.parameters = {
  docs: {
    storyDescription:
      '화면에서 가장 중요하고 핵심이 되는 텍스트일 경우 사용합니다.',
  },
};

export const Title2 = Template.bind({});
Title2.args = {
  variant: 'title2',
};

Title2.parameters = {
  docs: {
    storyDescription: '"title1" 다음으로 중요한 텍스트일 경우 사용합니다.',
  },
};

export const Subtitle1 = Template.bind({});
Subtitle1.args = {
  variant: 'subtitle1',
};

Subtitle1.parameters = {
  docs: {
    storyDescription: '세부사항 중에서 가장 중요한 텍스트일 경우 사용합니다.',
  },
};

export const Subtitle2 = Template.bind({});
Subtitle2.args = {
  variant: 'subtitle2',
};

Subtitle2.parameters = {
  docs: {
    storyDescription:
      '세부사항 중에서 "subtitle1" 다음으로 중요한 텍스트일 경우 사용합니다.',
  },
};

export const Body = Template.bind({});
Body.args = {
  variant: 'body',
};

Body.parameters = {
  docs: {
    storyDescription: '여러 문단으로 된 글이나 일반적인 텍스트에 사용합니다.',
  },
};

export const Desc = Template.bind({});
Desc.args = {
  variant: 'desc',
};

Desc.parameters = {
  docs: {
    storyDescription:
      '세부 설명처럼 일반 텍스트보다 작은 크기의 텍스트에 사용합니다.',
  },
};

export const WithColor = Template.bind({});
WithColor.args = {
  color: 'blue',
};

WithColor.parameters = {
  docs: {
    storyDescription: '사용자 지정 색상으로 텍스트 색상을 설정할 수 있습니다.',
  },
};

const HighlightTemplate: ComponentStory<typeof Typography> = () => (
  <Typography>
    안녕하세요. <Highlight>콜드스터디</Highlight> 디자인 시스템입니다. 🧊
  </Typography>
);

export const WithHighlight = HighlightTemplate.bind({});

WithHighlight.parameters = {
  docs: {
    storyDescription:
      '\\<Typography\\> 내부에서 강조하고 싶은 단어에 \\<Highlight\\> 컴포넌트를 사용할 수 있습니다.',
  },
};

const CustomHighlightTemplate: ComponentStory<typeof Typography> = () => (
  <Typography>
    안녕하세요. <Highlight color="orange">콜드스터디</Highlight> 디자인
    시스템입니다. 🧊
  </Typography>
);

export const WithCustomHighlight = CustomHighlightTemplate.bind({});

WithCustomHighlight.parameters = {
  docs: {
    storyDescription:
      '사용자 지정 색상으로 \\<Highlight\\> 컴포넌트의 강조 색상을 설정할 수 있습니다.',
  },
};
