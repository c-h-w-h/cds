import Icon from '@components/Icon';
import Link from '@components/Link';
import Flexbox from '@components-layout/Flexbox';
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdCelebration } from 'react-icons/md';

import Button from '.';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Button은 클릭 이벤트에 실행할 동작이 있는 경우 사용하는 컴포넌트입니다.',
    docs: {
      description: {
        component:
          '- variant 값으로 "round" | "square" | "light" | "round light" | "square light" | "plain" 중 하나를 선택할 수 있습니다.\n' +
          '\t- plain 버튼은 UI 개발 중 시맨틱 마크업을 위해 사용할 수 있습니다. background, border를 제외하고 인터랙션에 필요한 기본적인 스타일링을 제공합니다. \n' +
          '- type, disabled 등 HTML `<button>` 태그의 속성을 사용할 수 있습니다.\n' +
          '- 링크 역할을 하는 버튼은 `Link` 컴포넌트 사용을 권장합니다.\n' +
          '\t- 동일한 스타일링이 적용되지만 시맨틱 마크업 및 접근성을 포함한 네이티브 엘레먼트 기능 활용을 위해 `<a>` 태그를 사용합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      description: '버튼의 형태를 결정합니다.',
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: '"square"' },
      },
      control: {
        type: 'select',
        options: [
          'square',
          'light',
          'square light',
          'round',
          'round light',
          'plain',
        ],
      },
    },
    label: {
      description:
        'aria-label 속성으로 사용되는 값입니다. 요소의 역할을 간단히 설명합니다.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>
    <MdCelebration />
    상장하기
  </Button>
);

export const Default = Template.bind({});
Default.args = {
  label: '상장하기',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  docs: {
    storyDescription: 'disabled 상태에 적용되는 디자인입니다.',
  },
};

export const Light = Template.bind({});
Light.args = {
  variant: 'light',
};
Light.parameters = {
  docs: {
    storyDescription: 'light 버튼 디자인입니다.',
  },
};

export const Round = Template.bind({});
Round.args = {
  variant: 'round',
};
Round.parameters = {
  docs: {
    storyDescription: 'round 버튼 디자인입니다.',
  },
};

export const RoundLight = Template.bind({});
RoundLight.args = {
  variant: 'round light',
};
RoundLight.parameters = {
  docs: {
    storyDescription: 'round light 버튼 디자인입니다.',
  },
};

export const Plain = Template.bind({});
Plain.args = {
  variant: 'plain',
};
Plain.parameters = {
  docs: {
    storyDescription:
      'plain 버튼입니다. background 및 border 관련 스타일링이 제외됩니다.',
  },
};

export const IconOnly: ComponentStory<typeof Button> = () => (
  <Flexbox justifyContent="flex-start">
    <Button label="축하하는 버튼">
      <MdCelebration />
    </Button>
    <Button variant="light" label="축하하는 버튼">
      <MdCelebration />
    </Button>
    <Button variant="round" label="축하하는 버튼">
      <MdCelebration />
    </Button>
    <Button variant="round light" label="축하하는 버튼">
      <MdCelebration />
    </Button>
  </Flexbox>
);
IconOnly.parameters = {
  docs: {
    storyDescription: 'Icon만 사용한 버튼입니다.',
  },
};

export const Width100: ComponentStory<typeof Button> = () => (
  <Button
    css={css`
      width: 100%;
    `}
    label="상장하기"
  >
    <Icon source={MdCelebration} />
    상장하기
  </Button>
);
Width100.parameters = {
  docs: {
    storyDescription:
      'jsx의 css 또는 style 속성을 사용해 너비 등의 스타일링을 커스텀 할 수 있습니다.',
  },
};

export const AsLink: ComponentStory<typeof Button> = () => (
  <Link
    href="https://github.com/c-h-w-h/cds"
    target="_blank"
    label="차가운 디자인 시스템 레포지토리 링크"
  >
    <MdCelebration />
    상장하기
  </Link>
);
AsLink.parameters = {
  docs: {
    storyDescription:
      '`Link` 컴포넌트입니다. HTML `<a>` 태그의 속성을 사용할 수 있습니다. 아래의 버튼 링크에는 `target="_blank"`가 설정되어 있습니다.',
  },
};
