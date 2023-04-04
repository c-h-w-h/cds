import Button from '@components/Button';
import Center from '@components-layout/Center';
import Flexbox from '@components-layout/Flexbox';
import List from '@components-layout/List';
import { css } from '@emotion/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MdPeople } from 'react-icons/md';

import Dropdown from '.';

export default {
  title: 'Design System/Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Dropdown은 추가적인 메뉴를 담은 컴포넌트가 화면에 나타나도록 제어할 수 있는 트리거를 가지고 있습니다.',
    docs: {
      description: {
        component: `- 다음과 같은 컴포넌트를 children으로 사용할 수 있습니다.  
        - \\<Dropdown.Trigger\\> : \\<Dropdown.Menu\\>를 열기 위한 이벤트를 제어하는 컴포넌트입니다.
        - \\<Dropdown.Menu\\> : 사용자가 선택할 수 있는 선택지의 종류를 렌더링하는 컴포넌트입니다.
        `,
      },
    },
  },
  argTypes: {
    label: {
      name: 'label',
      description: '고유한 값으로 접근성 속성에 사용됩니다.',
      table: {
        type: { summary: 'string' },
      },
      control: {
        type: 'string',
      },
    },
    collapseOnBlur: {
      name: 'collapseOnBlur',
      description:
        '메뉴가 열렸을 때 메뉴 이외의 영역을 눌렀을 때 메뉴를 닫을 것인지 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    direction: {
      name: 'direction',
      description: '메뉴가 열리는 방향을 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
      control: {
        type: 'select',
        options: ['left', 'right', 'top', 'bottom'],
      },
    },
  },
  decorators: [
    (Story) => (
      <Flexbox
        justifyContent={'center'}
        alignItems={'center'}
        css={css`
          height: 500px;
        `}
      >
        <Center>
          <Story />
        </Center>
      </Flexbox>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args}>
    <Dropdown.Trigger>
      <Button text="팀원 목록" icon={MdPeople} variant="light" />
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <List
        css={css`
          width: max-content;
        `}
      >
        <li>김세영</li>
        <li>백도훈</li>
        <li>이선민</li>
        <li>이우재</li>
        <li>이현빈</li>
        <li>정주연</li>
      </List>
    </Dropdown.Menu>
  </Dropdown>
);

export const Default = Template.bind({});
Default.args = {
  label: 'dropdown0',
};

export const DirectionBottom = Template.bind({});
DirectionBottom.args = {
  label: 'dropdown1',
  direction: 'bottom',
};

DirectionBottom.parameters = {
  docs: {
    storyDescription:
      '<Dropdown.Menu>가 열렸을 때 나타나는 방향의 기본값은 하단(bottom)입니다.',
  },
};

export const DirectionTop = Template.bind({});
DirectionTop.args = {
  label: 'dropdown2',
  direction: 'top',
};

DirectionTop.parameters = {
  docs: {
    storyDescription:
      'direction을 "top"으로 설정하면 <Dropdown.Menu>가 상단에 열립니다.',
  },
};

export const DirectionLeft = Template.bind({});
DirectionLeft.args = {
  label: 'dropdown3',
  direction: 'left',
};

DirectionLeft.parameters = {
  docs: {
    storyDescription:
      'direction을 "left"로 설정하면 <Dropdown.Menu>가 좌측에 열립니다.',
  },
};

export const DirectionRight = Template.bind({});
DirectionRight.args = {
  label: 'dropdown4',
  direction: 'right',
};

DirectionRight.parameters = {
  docs: {
    storyDescription:
      'direction을 "right"로 설정하면 <Dropdown.Menu>가 우측에 열립니다.',
  },
};

export const CollapseOnBlur = Template.bind({});
CollapseOnBlur.args = {
  label: 'dropdown5',
  collapseOnBlur: true,
};

CollapseOnBlur.parameters = {
  docs: {
    storyDescription:
      'collapseOnBlur를 true로 설정하면 <Dropdown.Menu>가 열렸을 때 메뉴 이외의 영역을 클릭했을 경우 메뉴가 닫히도록 설정합니다.',
  },
};
