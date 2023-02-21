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

const Template: ComponentStory<typeof Flexbox> = (args) => {
  const commonStyle = css`
    width: 300px;
    background-color: #dfdfdf;
  `;

  return (
    <Flexbox css={commonStyle} {...args}>
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
    </Flexbox>
  );
};

export const RowFlexbox = Template.bind({});
RowFlexbox.args = {
  direction: 'row',
};

export const SpaceBetweenFlexbox = Template.bind({});
SpaceBetweenFlexbox.args = {
  justifyContent: 'space-between',
  gap: '0rem',
};

export const MultiLineFlexbox = Template.bind({});
MultiLineFlexbox.args = {
  wrap: 'wrap',
  alignContent: 'center',
  css: css`
    width: 100px;
    height: 300px;
    background-color: #dfdfdf;
  `,
};

export const ColumnFlexbox = Template.bind({});
ColumnFlexbox.args = {
  direction: 'column',
};
