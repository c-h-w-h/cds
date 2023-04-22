import Flexbox from '@components-layout/Flexbox';
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RangeSelector from '.';

export default {
  title: 'Design System/Components/RangeSelector',
  component: RangeSelector,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'RangeSelector는 HTML의 <input type="range">처럼 슬라이더를 조절하여 값을 얻을 수 있는 컴포넌트입니다.',
    docs: {
      description: {
        component: `- 다음과 같은 컴포넌트를 children으로 사용할 수 있습니다.  
        - \\<RangeSelector.Slider> : 값을 조절할 수 있는 Thumb와 Track을 표시합니다.
        - \\<RangeSelector.RangeDisplay> : \\<RangeSelector\\>에 전달한 최소/최대값을 Track 길이에 맞춰 표시합니다.
        `,
      },
    },
  },
  argTypes: {
    id: {
      name: 'id',
      description: 'DOM 요소를 고유하게 식별하기 위한 값입니다.',
    },
    label: {
      name: 'label',
      description: '고유한 값으로 접근성 속성에 사용됩니다.',
    },
    min: {
      name: 'min',
      description: '최소값을 제한합니다.',
    },
    max: {
      name: 'max',
      description: '최대값을 제한합니다.',
    },
    init: {
      name: 'init',
      description: '초기 슬라이드 값을 설정합니다.',
    },
    trackWidth: {
      name: 'trackWidth',
      description: 'px단위로 Track 길이를 설정합니다.',
    },
  },
  decorators: [
    (Story) => (
      <Flexbox
        justifyContent={'center'}
        alignItems={'center'}
        css={css`
          height: 200px;
        `}
      >
        <Story />
      </Flexbox>
    ),
  ],
} as ComponentMeta<typeof RangeSelector>;

const DEFAULT_PROPS = {
  id: 'default',
  label: 'Primitive 슬라이더',
};

const Template: ComponentStory<typeof RangeSelector> = (args) => (
  <RangeSelector {...args} {...DEFAULT_PROPS}>
    <RangeSelector.Slider />
    <RangeSelector.RangeDisplay />
  </RangeSelector>
);

export const Default = Template.bind({});
Default.args = {
  min: 0,
  max: 100,
  init: 50,
  trackWidth: 200,
};

export const StartFromZero = Template.bind({});
StartFromZero.args = {
  min: 0,
  max: 100,
  init: 0,
  trackWidth: 200,
};

StartFromZero.parameters = {
  docs: {
    storyDescription: 'init을 min과 동일하게 설정합니다.',
  },
};

export const StartFromHalf = Template.bind({});
StartFromHalf.args = {
  min: 0,
  max: 100,
  init: 50,
  trackWidth: 200,
};

StartFromHalf.parameters = {
  docs: {
    storyDescription: 'init을 min과 max의 중간값으로 설정합니다.',
  },
};

export const StartFromEnd = Template.bind({});
StartFromEnd.args = {
  min: 0,
  max: 100,
  init: 100,
  trackWidth: 200,
};

StartFromEnd.parameters = {
  docs: {
    storyDescription: 'init을 max와 동일하게 설정합니다.',
  },
};

export const MinValueVariant = Template.bind({});
MinValueVariant.args = {
  min: 50,
  max: 100,
  init: 75,
  trackWidth: 200,
};

MinValueVariant.parameters = {
  docs: {
    storyDescription: '최소값을 0이 아닌 값으로 설정할 수 있습니다.',
  },
};

export const MaxValueVariant = Template.bind({});
MaxValueVariant.args = {
  min: 50,
  max: 200,
  init: 100,
  trackWidth: 200,
};

MaxValueVariant.parameters = {
  docs: {
    storyDescription: '최대값을 100이 아닌 값으로 설정할 수 있습니다.',
  },
};

export const SizeVariant = Template.bind({});
SizeVariant.args = {
  min: 0,
  max: 100,
  init: 50,
  trackWidth: 500,
};

SizeVariant.parameters = {
  docs: {
    storyDescription:
      'trackWidth를 px 단위로 하여 전체 컴포넌트의 너비가 결정됩니다.',
  },
};
