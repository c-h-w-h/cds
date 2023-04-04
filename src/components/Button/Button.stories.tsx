import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdCelebration } from 'react-icons/md';

import Button from '.';

export default {
  title: 'Design System/Components/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: 'Button 컴포넌트입니다.',
    docs: {
      description: {
        component:
          '- variant 값으로 "round" | "square" | "light" | "round light" | "square light" | "plain" 중 하나를 선택할 수 있습니다.\n' +
          '\t- plain 버튼은 인터랙션에 필요한 기본적인 스타일링을 제공합니다. UI 개발 중 시맨틱 마크업을 위해 사용할 수 있습니다.\n' +
          '- text, icon 값은 요구사항에 따라 선택적으로 사용이 가능합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      description: '버튼의 형태를 결정합니다.',
      table: {
        type: { summary: 'ButtonVariant' },
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
    icon: {
      description:
        '버튼 내부에 들어갈 아이콘입니다. `react-icons` 라이브러리 아이콘 또는 URL string을 사용할 수 있습니다.',
      table: {
        type: { summary: 'IconType | string' },
      },
      control: {
        type: 'text',
      },
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
    iconTranslateY: {
      description: '아이콘의 y축 위치 조정이 필요한 경우 사용합니다.',
      table: {
        type: { summary: "CSSProperties['translate']" },
      },
      control: {
        type: 'number',
      },
    },
    href: {
      description: '링크 역할을 하는 버튼은 href 속성을 전달합니다.',
      table: {
        type: { summary: 'ButtonVariant' },
      },
    },
    type: {
      description:
        'HTML 기본 속성입니다. href props가 주어지는 경우 사용되지 않습니다.',
    },
    disabled: {
      description:
        'HTML 기본 속성입니다. href props가 주어지는 경우 사용되지 않습니다.',
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button icon={MdCelebration} text="상장하기" {...args} />
);

export const Default = Template.bind({});

export const AsLink = Template.bind({});
AsLink.args = {
  href: 'http://localhost:6006/?path=/story/button--link',
};
AsLink.parameters = {
  docs: {
    storyDescription:
      '시맨틱 마크업과 접근성을 위해 a 태그를 사용합니다. 버튼 컴포넌트의 디자인이 동일하게 적용됩니다. ',
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  docs: {
    storyDescription: 'disabled 상태에 적용되는 스타일입니다.',
  },
};

export const IconInUrl = Template.bind({});
IconInUrl.args = {
  icon: 'https://user-images.githubusercontent.com/63814960/220829587-f305856c-b7bc-4dd0-a199-40735c9da5dc.png',
  iconSize: '500px',
  iconTranslateY: '-1px',
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
