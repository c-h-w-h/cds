import Button from '@components/Button';
import Flexbox from '@components-layout/Flexbox';
import List from '@components-layout/List';
import { css } from '@emotion/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MdPeople } from 'react-icons/md';

import Dropdown from '.';

export default {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    direction: {
      options: ['left', 'right', 'top', 'bottom'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Flexbox
    css={css`
      height: 300px;
      width: 300px;
      justify-content: center;
      align-items: center;
    `}
  >
    <Dropdown {...args}>
      <Dropdown.Trigger
        Element={<Button text="팀원 목록" icon={MdPeople} variant="light" />}
      />
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
  </Flexbox>
);

export const Default = Template.bind({});
Default.args = {
  label: 'dropdown1',
};

export const DirectionTop = Template.bind({});
DirectionTop.args = {
  label: 'dropdown2',
  direction: 'top',
};

export const DirectionLeft = Template.bind({});
DirectionLeft.args = {
  label: 'dropdown3',
  direction: 'left',
};

export const DirectionRight = Template.bind({});
DirectionRight.args = {
  label: 'dropdown4',
  direction: 'right',
};

export const CollapseOnBlur = Template.bind({});
CollapseOnBlur.args = {
  label: 'dropdown5',
  collapseOnBlur: true,
};
