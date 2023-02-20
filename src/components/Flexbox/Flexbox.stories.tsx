import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Flexbox from '.';

export default {
  title: 'Flexbox',
  component: Flexbox,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Flexbox>;

const Template: ComponentStory<typeof Flexbox> = (args) => (
  <Flexbox {...args}>
    <p>1</p>
    <p>2</p>
    <p>3</p>
  </Flexbox>
);

export const RowFlexbox = Template.bind({});
RowFlexbox.args = {
  direction: 'row',
};

export const SpaceBetweenFlexbox = Template.bind({});
SpaceBetweenFlexbox.args = {
  justifyContent: 'space-between',
  gap: '0rem',
  css: css`
    width: 300px;
  `,
};

export const ColumnFlexbox = Template.bind({});
ColumnFlexbox.args = {
  direction: 'column',
};
