import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdAccessibility } from 'react-icons/md';

import { Dropdown, DropdownItem } from '.';

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
  return <div>Click to expand Dropdown Mesnu!</div>;
};

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

// export const Dropdown2 = Template.bind({});
// Dropdown2.args = {
//   children: (

//   ),
// };
