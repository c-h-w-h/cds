import Button from '@components/Button';
import Flexbox from '@components-layout/Flexbox';
import List from '@components-layout/List';
import { css } from '@emotion/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MdPeople } from 'react-icons/md';

import DropdownV2 from '.';

export default {
  title: 'Dropdown-v2',
  component: DropdownV2,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    direction: {
      options: ['left', 'right', 'top', 'bottom'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof DropdownV2>;

const Template: ComponentStory<typeof DropdownV2> = (args) => (
  <Flexbox
    css={css`
      height: 300px;
      width: 300px;
      justify-content: center;
      align-items: center;
    `}
  >
    <DropdownV2 {...args}>
      <DropdownV2.Trigger>
        <Button text="팀원 목록" icon={MdPeople} variant="light" />
      </DropdownV2.Trigger>
      <DropdownV2.Menu>
        <List>
          <li>김세영</li>
          <li>백도훈</li>
          <li>이선민</li>
          <li>이우재</li>
          <li>이현빈</li>
          <li>정주연</li>
        </List>
      </DropdownV2.Menu>
    </DropdownV2>
  </Flexbox>
);

export const Default = Template.bind({});
Default.args = {
  id: 'dropdown1',
  dropdownLabel: 'Default dropdown',
};

export const DirectonTop = Template.bind({});
DirectonTop.args = {
  id: 'dropdown2',
  dropdownLabel: 'Default dropdown',
  direction: 'top',
};

export const DirectonLeft = Template.bind({});
DirectonLeft.args = {
  id: 'dropdown3',
  dropdownLabel: 'Default dropdown',
  direction: 'left',
};

export const DirectonRight = Template.bind({});
DirectonRight.args = {
  id: 'dropdown4',
  dropdownLabel: 'Default dropdown',
  direction: 'right',
};

export const CollapseOnBlur = Template.bind({});
CollapseOnBlur.args = {
  id: 'dropdown5',
  dropdownLabel: 'Default dropdown',
  collapseOnBlur: true,
};
