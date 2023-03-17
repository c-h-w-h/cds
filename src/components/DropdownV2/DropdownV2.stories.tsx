import { ComponentMeta, ComponentStory } from '@storybook/react';

import DropdownV2 from '.';

export default {
  title: 'Dropdown-v2',
  component: DropdownV2,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DropdownV2>;

const Template: ComponentStory<typeof DropdownV2> = (args) => (
  <>
    <DropdownV2 {...args}>
      <DropdownV2.Trigger>
        <button>ㅎㅇㅎㅇ</button>
      </DropdownV2.Trigger>
      <DropdownV2.Menu>
        <div>리스트</div>
      </DropdownV2.Menu>
    </DropdownV2>
  </>
);

export const Default = Template.bind({});
Default.args = {
  id: 'dropdown1',
  dropdownLabel: 'Default dropdown',
};
