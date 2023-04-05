import { ComponentStory, ComponentMeta } from '@storybook/react';

import Spacing from '.';

export default {
  title: 'Design System/Components/Spacing',
  component: Spacing,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Spacing은 선언적으로 사용할 수 있는 다양한 크기의 여백을 제공합니다.',
    docs: {
      description: {
        component:
          `- size 값으로 5 | 10 | 15 | 20 | 30 | 40 | 60 | 80 | 100 중 하나를 선택할 수 있습니다. \n` +
          `- 선택한 size 값은 px 단위로 적용됩니다.`,
      },
    },
  },
  argTypes: {
    size: {
      description: '여백의 크기를 설정합니다.',
      table: {
        type: { summary: 'SpacingVariant' },
      },
      control: {
        type: 'select',
        options: [5, 10, 15, 20, 30, 40, 60, 80, 100],
      },
    },
  },
} as ComponentMeta<typeof Spacing>;

const DUMMY_TEXT1 = '첫 번째 더미 요소';
const DUMMY_TEXT2 = '두 번째 더미 요소';

const Template: ComponentStory<typeof Spacing> = (args) => (
  <>
    <div>{DUMMY_TEXT1}</div>
    <Spacing {...args} />
    <div>{DUMMY_TEXT2}</div>
  </>
);

export const Default = Template.bind({});

export const Size_5 = Template.bind({});
Size_5.args = {
  size: 5,
};

Size_5.parameters = {
  docs: {
    storyDescription: '5px만큼의 여백을 나타냅니다.',
  },
};

export const Size_10 = Template.bind({});
Size_10.args = {
  size: 10,
};

Size_10.parameters = {
  docs: {
    storyDescription: '10px만큼의 여백을 나타냅니다.',
  },
};

export const Size_15 = Template.bind({});
Size_15.args = {
  size: 15,
};

Size_15.parameters = {
  docs: {
    storyDescription: '15px만큼의 여백을 나타냅니다.',
  },
};

export const Size_20 = Template.bind({});
Size_20.args = {
  size: 20,
};

Size_20.parameters = {
  docs: {
    storyDescription: '20px만큼의 여백을 나타냅니다.',
  },
};

export const Size_30 = Template.bind({});
Size_30.args = {
  size: 30,
};

Size_30.parameters = {
  docs: {
    storyDescription: '30px만큼의 여백을 나타냅니다.',
  },
};

export const Size_40 = Template.bind({});
Size_40.args = {
  size: 40,
};

Size_40.parameters = {
  docs: {
    storyDescription: '40px만큼의 여백을 나타냅니다.',
  },
};

export const Size_60 = Template.bind({});
Size_60.args = {
  size: 60,
};

Size_60.parameters = {
  docs: {
    storyDescription: '60px만큼의 여백을 나타냅니다.',
  },
};

export const Size_80 = Template.bind({});
Size_80.args = {
  size: 80,
};

Size_80.parameters = {
  docs: {
    storyDescription: '80px만큼의 여백을 나타냅니다.',
  },
};

export const Size_100 = Template.bind({});
Size_100.args = {
  size: 100,
};

Size_100.parameters = {
  docs: {
    storyDescription: '100px만큼의 여백을 나타냅니다.',
  },
};
