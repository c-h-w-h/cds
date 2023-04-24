import Button from '@components/Button';
import Flexbox from '@components-layout/Flexbox';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdCelebration } from 'react-icons/md';

import Slider from '.';

export default {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Slider는 HTML의 <input type="range">처럼 슬라이더를 조절하여 값을 얻을 수 있는 컴포넌트입니다.',
    docs: {
      description: {
        component: `- 다음과 같은 컴포넌트를 children으로 사용할 수 있습니다.  
        - \\<Slider.Track> : \\<Slider.Thumb\\>가 위치할 수 있는 수직 혹은 수평선입니다. 
        - \\<Slider.Filled> : \\<Slider\\> 값만큼 \\<Slider.Track\\>의 높이 혹은 너비를 채웁니다.
        - \\<Slider.Thumb> : \\<Slider\\>의 값을 마우스 혹은 키보드로 조절할 수 있는 컨트롤러입니다. 
        `,
      },
    },
  },
  argTypes: {
    label: {
      description: '고유한 값으로 접근성 속성에 사용됩니다.',
      table: {
        type: { summary: 'string', required: true },
      },
      control: {
        type: 'text',
      },
    },
    min: {
      description: '최소값을 설정합니다.',
      table: {
        type: { summary: 'number', required: true },
      },
      control: {
        type: 'number',
      },
    },
    max: {
      description: '최대값을 설정합니다.',
      table: {
        type: { summary: 'number', required: true },
      },
      control: {
        type: 'number',
      },
    },
    defaultValue: {
      description: '초기 슬라이드 값을 설정합니다.',
      table: {
        type: { summary: 'number', required: true },
      },
      control: {
        type: 'number',
      },
    },
    size: {
      description: '<Slider.Track> 길이를 설정합니다.',
      table: {
        type: { summary: `CSSProperties['width']` },
        defaultValue: { summary: '100%' },
      },
      control: {
        type: 'text',
      },
    },
    step: {
      description:
        '<Slider.Thumb>가 1회 이동할 때 변경되는 \\<Slider> 값을 설정합니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
      control: {
        type: 'number',
      },
    },
    orientation: {
      description: '\\<Slider>의 방향을 결정합니다.',
      table: {
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: 'horizontal' },
      },
      control: {
        type: 'radio',
        options: ['horizontal', 'vertical'],
      },
    },
    color: {
      description: '각 하위 컴포넌트의 색상을 설정합니다.',
      table: {
        type: { summary: 'string' },
        category: ['Slider.Track', 'Slider.Filled', 'Slider.Thumb'],
      },
    },
  },
  decorators: [
    (Story) => (
      <Flexbox
        justifyContent={'center'}
        alignItems={'center'}
        style={{
          height: '250px',
          padding: '50px',
        }}
      >
        {Story()}
      </Flexbox>
    ),
  ],
} as ComponentMeta<typeof Slider>;

const DEFAULT_LABEL = 'cds_Slider';
const DEFAULT_PROPS = {
  label: DEFAULT_LABEL,
  min: 0,
  max: 100,
  defaultValue: 50,
};

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = { ...DEFAULT_PROPS };

export const OnlySlider = Template.bind({});
OnlySlider.args = { ...DEFAULT_PROPS };

OnlySlider.parameters = {
  docs: {
    storyDescription:
      '하위 컴포넌트 없이 \\<Slider> 만으로도 사용할 수 있습니다.',
  },
};

export const StartFromZero = Template.bind({});
StartFromZero.args = { ...DEFAULT_PROPS, defaultValue: 0 };

StartFromZero.parameters = {
  docs: {
    storyDescription: 'defaultValue을 min과 동일하게 설정합니다.',
  },
};

export const StartFromEnd = Template.bind({});
StartFromEnd.args = { ...DEFAULT_PROPS, defaultValue: 100 };

StartFromEnd.parameters = {
  docs: {
    storyDescription: 'defaultValue을 max와 동일하게 설정합니다.',
  },
};

export const MinValueVariant = Template.bind({});
MinValueVariant.args = { ...DEFAULT_PROPS, min: 50, defaultValue: 75 };

MinValueVariant.parameters = {
  docs: {
    storyDescription: '최소값을 0이 아닌 값으로 설정할 수 있습니다.',
  },
};

export const MaxValueVariant = Template.bind({});
MaxValueVariant.args = {
  label: DEFAULT_LABEL,
  min: 50,
  max: 200,
  defaultValue: 100,
};

MaxValueVariant.parameters = {
  docs: {
    storyDescription: '최대값을 100이 아닌 값으로 설정할 수 있습니다.',
  },
};

export const SizeVariant = Template.bind({});
SizeVariant.args = { ...DEFAULT_PROPS, size: 500 };

SizeVariant.parameters = {
  docs: {
    storyDescription: 'size를 px 단위로 하여 너비/높이를 결정합니다.',
  },
};

export const WithStep10 = Template.bind({});
WithStep10.args = { ...DEFAULT_PROPS, step: 10 };

WithStep10.parameters = {
  docs: {
    storyDescription:
      'step 속성을 10으로 설정하여 <Slider.Thumb>가 1회 이동할 때 \\<Slider> 값이 10씩 변경됩니다.',
  },
};

export const WithStep20 = Template.bind({});
WithStep20.args = { ...DEFAULT_PROPS, step: 20 };

WithStep20.parameters = {
  docs: {
    storyDescription:
      'step 속성을 20으로 설정하여 <Slider.Thumb>가 1회 이동할 때 \\<Slider> 값이 20씩 변경됩니다.',
  },
};

export const WithVerticalOrientation = Template.bind({});
WithVerticalOrientation.args = { ...DEFAULT_PROPS, orientation: 'vertical' };

WithVerticalOrientation.parameters = {
  docs: {
    storyDescription:
      'orientation 속성을 vertical로 명시하면 <Slider.Track>의 방향이 세로로 설정됩니다. 다른 모든 속성들이 동일하게 적용됩니다. ',
  },
};

const ColorTemplate: ComponentStory<typeof Slider> = (args) => (
  <Slider {...args}>
    <Slider.Track color={'thistle'}>
      <Slider.Filled color={'slateblue'} />
    </Slider.Track>
    <Slider.Thumb color={'slateblue'} />
  </Slider>
);

export const WithCustomColor = ColorTemplate.bind({});
WithCustomColor.args = { ...DEFAULT_PROPS };

WithCustomColor.parameters = {
  docs: {
    storyDescription:
      '<Slider.Track>, <Slider.Filled>, <Slider.Thumb> 컴포넌트에 color 값을 명시적으로 설정할 수 있습니다.',
  },
};

const ThumbTemplate: ComponentStory<typeof Slider> = (args) => (
  <Slider {...args}>
    <Slider.Track>
      <Slider.Filled />
    </Slider.Track>
    <Slider.Thumb>
      <Button variant="round" label="Slider Thumb">
        <MdCelebration />
      </Button>
    </Slider.Thumb>
  </Slider>
);

export const WithCustomThumb = ThumbTemplate.bind({});
WithCustomThumb.args = { ...DEFAULT_PROPS };

WithCustomThumb.parameters = {
  docs: {
    storyDescription:
      '<Slider.Thumb> 컴포넌트에 children prop으로 전달하는 노드를 Thumb로 사용할 수 있습니다.',
  },
};
