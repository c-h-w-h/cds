import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdAccessibility } from 'react-icons/md';

import { Dropdown, DropdownCustomItem, DropdownItem } from '.';

export default {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    align: {
      options: ['left', 'right', 'center'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Dropdown>;

const DUMMY_TOGGLE = () => {
  return (
    <div>
      드롭다운토글은커스텀엘레먼트로자유롭게서식을적용할수있습니다테스트를위해아주긴토글을만들었어요
    </div>
  );
};

const DUMMY_CUSTOM_ITEM = css`
  font-weight: 700;
  background-color: red;
`;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} toggleElement={<DUMMY_TOGGLE />}>
    <DropdownItem title="첫 번째 아이템" icon={MdAccessibility} />
    <DropdownItem title="두 번째 아이템" description="저는 설명이 있는데용" />
    <DropdownItem
      title="세 번째 아이템"
      description="저는 설명과 아이콘도 있어용"
      icon={MdAccessibility}
    />
    <DropdownItem
      title="세 번째 아이템(무료 alert 포함)"
      onClick={() => {
        alert('무료로 제공해드리는 alert입니다');
      }}
    />
    <DropdownCustomItem css={DUMMY_CUSTOM_ITEM}>
      저는 커스텀 아이템 이에용
    </DropdownCustomItem>
  </Dropdown>
);

export const Left = Template.bind({});
Left.args = {
  align: 'left',
};

export const Right = Template.bind({});
Right.args = {
  align: 'right',
};

export const Center = Template.bind({});
Center.args = {
  align: 'center',
};
