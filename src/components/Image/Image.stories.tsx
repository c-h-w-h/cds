import { ComponentStory, ComponentMeta } from '@storybook/react';

import Image from '.';

export default {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Image는 지정된 크기와 모양으로 이미지를 제공하는 컴포넌트입니다.',
  },
  argTypes: {
    src: {
      description: '이미지가 저장된 경로나 URL을 설정합니다.',
      table: {
        type: { summary: 'string', required: true },
      },
      control: {
        type: 'text',
      },
    },
    alt: {
      description: '이미지의 대체 텍스트를 설정합니다.',
      table: {
        type: { summary: 'string', required: true },
      },
      control: {
        type: 'text',
      },
    },
    size: {
      description: '이미지 크기를 설정합니다.',
      table: {
        type: { summary: 'string', required: true },
      },
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    shape: {
      description: '이미지 모양을 설정합니다.',
      table: {
        type: { summary: 'string' },
      },
      control: {
        type: 'select',
        options: ['circle', 'rounded'],
      },
    },
  },
} as ComponentMeta<typeof Image>;

const DUMMY_SRC = 'https://picsum.photos/seed/picsum/200/300';
const DUMMY_ALT = '테스트 이미지를 설명';

const Template: ComponentStory<typeof Image> = (args) => (
  <Image {...args} src={DUMMY_SRC} alt={DUMMY_ALT} />
);

export const Default = Template.bind({});
Default.args = {
  size: 'small',
};

export const SmallDefault = Template.bind({});
SmallDefault.args = {
  size: 'small',
};

SmallDefault.parameters = {
  docs: {
    storyDescription: '크기가 small이고 shape을 설정하지 않은 이미지입니다.',
  },
};

export const SmallCircle = Template.bind({});
SmallCircle.args = {
  size: 'small',
  shape: 'circle',
};

SmallCircle.parameters = {
  docs: {
    storyDescription: '크기가 small이고 모양이 원형인 이미지입니다.',
  },
};

export const SmallRounded = Template.bind({});
SmallRounded.args = {
  size: 'small',
  shape: 'rounded',
};

SmallRounded.parameters = {
  docs: {
    storyDescription: '크기가 small이고 모서리가 둥근 이미지입니다.',
  },
};

export const MediumDefault = Template.bind({});
MediumDefault.args = {
  size: 'medium',
};

MediumDefault.parameters = {
  docs: {
    storyDescription: '크기가 medium이고 shape을 설정하지 않은 이미지입니다.',
  },
};

export const MediumCircle = Template.bind({});
MediumCircle.args = {
  size: 'medium',
  shape: 'circle',
};

MediumCircle.parameters = {
  docs: {
    storyDescription: '크기가 medium이고 모양이 원형인 이미지입니다.',
  },
};

export const MediumRounded = Template.bind({});
MediumRounded.args = {
  size: 'medium',
  shape: 'rounded',
};

MediumRounded.parameters = {
  docs: {
    storyDescription: '크기가 medium이고 모서리가 둥근 이미지입니다.',
  },
};

export const LargeDefault = Template.bind({});
LargeDefault.args = {
  size: 'large',
};

LargeDefault.parameters = {
  docs: {
    storyDescription: '크기가 large이고 shape을 설정하지 않은 이미지입니다.',
  },
};

export const LargeCircle = Template.bind({});
LargeCircle.args = {
  size: 'large',
  shape: 'circle',
};

LargeCircle.parameters = {
  docs: {
    storyDescription: '크기가 large이고 모양이 원형인 이미지입니다.',
  },
};

export const LargeRounded = Template.bind({});
LargeRounded.args = {
  size: 'large',
  shape: 'rounded',
};

LargeRounded.parameters = {
  docs: {
    storyDescription: '크기가 large이고 모서리가 둥근 이미지입니다.',
  },
};
