import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdCelebration } from 'react-icons/md';

import Button from '.';

export default {
  title: 'Design System/Components/Button',
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
          '- text, icon 값은 요구사항에 따라 선택적으로 사용이 가능합니다.\n' +
          '- 링크 역할을 하는 버튼은 href props를 전달합니다.\n' +
          '\t- 이 경우 버튼 컴포넌트의 디자인이 동일하게 적용되지만 시맨틱 마크업과 접근성을 위해 a 태그를 사용합니다.',
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
    text: {
      description: '버튼 내부에 들어갈 텍스트입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      description:
        'aria-label 속성으로 사용되는 값입니다. 요소의 역할을 간단히 설명합니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      description:
        '버튼 내부에 들어갈 아이콘입니다. `react-icons` 라이브러리 아이콘 또는 URL string을 사용할 수 있습니다.',
      table: {
        type: { summary: 'IconType | string' },
      },
      control: false,
    },
    iconSize: {
      description: '아이콘이 있는 경우 그 크기를 결정합니다.',
      table: {
        type: { summary: "CSSProperties['width']" },
      },
      control: {
        type: 'number',
      },
    },
    iconPosition: {
      description: '아이콘이 있는 경우 그 위치를 결정합니다.',
      table: {
        type: { summary: '"left" | "right"' },
      },
    },
    href: {
      description: '버튼을 클릭했을 때 이동할 링크입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      description:
        'HTML 기본 속성입니다. href props가 주어지는 경우 사용되지 않습니다.',
      table: {
        defaultValue: { summary: '"button"' },
      },
    },
    disabled: {
      description:
        'HTML 기본 속성입니다. href props가 주어지는 경우 사용되지 않습니다.',
      table: {
        defaultValue: { summary: false },
      },
    },
  },
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
Default.args = {
  icon: MdCelebration,
  text: '상장하기',
  label: '상장하기',
};

const Template: ComponentStory<typeof Button> = (args) => (
  <Button icon={MdCelebration} text="상장하기" {...args} label="상장하기" />
);

export const AsLink: ComponentStory<typeof Button> = (args) => (
  <Button
    href="https://github.com/c-h-w-h/cds"
    icon={MdCelebration}
    text="상장하기"
    {...args}
    label="차가운 디자인 시스템 레포지토리 링크"
  />
);
AsLink.parameters = {
  docs: {
    storyDescription: '링크의 역할을 하는 버튼입니다.',
  },
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

export const IconInUrl = Template.bind({});
IconInUrl.args = {
  icon: 'https://user-images.githubusercontent.com/63814960/220829587-f305856c-b7bc-4dd0-a199-40735c9da5dc.png',
  iconSize: '500px',
};
IconInUrl.parameters = {
  docs: {
    storyDescription:
      'icon props에는 원하는 이미지 소스의 URL을 전달할 수 있습니다.',
  },
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  icon: MdCelebration,
  text: undefined,
};
IconOnly.parameters = {
  docs: {
    storyDescription: 'text 없이 icon props만 사용한 버튼입니다.',
  },
};

export const TextOnly = Template.bind({});
TextOnly.args = {
  icon: undefined,
  text: '상장하기',
};
TextOnly.parameters = {
  docs: {
    storyDescription: 'icon 없이 text props만 사용한 버튼입니다.',
  },
};

export const Width100: ComponentStory<typeof Button> = (args) => (
  <Button
    icon={MdCelebration}
    text="상장하기"
    css={css`
      width: 100%;
    `}
    {...args}
    label="상장하기"
  />
);
Width100.parameters = {
  docs: {
    storyDescription:
      'jsx의 css 또는 style 속성을 사용해 너비를 커스텀 할 수 있습니다.',
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

export const RoundIconOnly = Template.bind({});
RoundIconOnly.args = {
  variant: 'round',
  text: undefined,
};
RoundIconOnly.parameters = {
  docs: {
    storyDescription: 'text 없이 icon props만 사용한 round 버튼입니다.',
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
