import { ComponentStory, ComponentMeta } from '@storybook/react';

import Image from '.';

export default {
  title: 'Design System/Components/Image',
  component: Image,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Image는 지정된 크기와 모양으로 이미지를 제공하는 컴포넌트입니다.',
  },
  argTypes: {
    src: {
      name: 'src',
      description: '이미지가 저장된 경로나 URL을 설정합니다.',
      table: {
        type: { summary: 'string', required: true },
      },
      control: {
        type: 'text',
      },
    },
    alt: {
      name: 'alt',
      description: '이미지의 대체 텍스트를 설정합니다.',
      table: {
        type: { summary: 'string', required: true },
      },
      control: {
        type: 'text',
      },
    },
    size: {
      name: 'size',
      description: '이미지 크기를 설정합니다.',
      table: {
        type: { summary: 'ImageSizeVariant', required: true },
      },
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    shape: {
      name: 'shape',
      description: '이미지 모양을 설정합니다.',
      table: {
        type: { summary: 'ImageShapeVariant' },
      },
      control: {
        type: 'select',
        options: ['circle', 'rounded'],
      },
    },
  },
} as ComponentMeta<typeof Image>;

const DEFAULT_ARGS = {
  src: 'https://user-images.githubusercontent.com/31645195/233934759-59b7a8e6-4dfd-41f5-9c06-4985c65bdc53.png',
  alt: '테스트 이미지를 설명',
};

const Template: ComponentStory<typeof Image> = (args) => (
  <Image {...args} {...DEFAULT_ARGS} />
);

export const Default = Template.bind({});
Default.args = {
  size: 'small',
};

const SizeVariantTemplate: ComponentStory<typeof Image> = (args) => {
  return (
    <>
      <Image {...args} {...DEFAULT_ARGS} size={'small'} />
      <Image {...args} {...DEFAULT_ARGS} size={'medium'} />
      <Image {...args} {...DEFAULT_ARGS} size={'large'} />
    </>
  );
};

export const SizeVariant = SizeVariantTemplate.bind({});
SizeVariant.parameters = {
  docs: {
    storyDescription:
      'size 속성을 설정하여 컴포넌트의 크기를 설정할 수 있습니다. 좌측부터 차례로 small, medium, large 입니다.',
  },
};

const ShapeVariantTemplate: ComponentStory<typeof Image> = (args) => {
  return (
    <>
      <Image {...args} {...DEFAULT_ARGS} size={'large'} shape={'circle'} />
      <Image {...args} {...DEFAULT_ARGS} size={'large'} shape={'rounded'} />
    </>
  );
};

export const ShapeVariant = ShapeVariantTemplate.bind({});
ShapeVariant.parameters = {
  docs: {
    storyDescription:
      'shape 속성을 설정하여 테두리 모양을 설정할 수 있습니다. 좌측부터 차례로 circle, rounded 입니다.',
  },
};
