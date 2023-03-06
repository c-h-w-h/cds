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

const items = (
  <>
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <p>5</p>
    <p>6</p>
  </>
);

const Template: ComponentStory<typeof Flexbox> = (args) => {
  const commonStyle = css`
    width: 300px;
    background-color: #dfdfdf;
  `;

  return (
    <Flexbox css={commonStyle} {...args}>
      {items}
    </Flexbox>
  );
};

export const Row = Template.bind({});
Row.args = {
  flexDirection: 'row',
};

export const SpaceBetween = Template.bind({});
SpaceBetween.args = {
  justifyContent: 'space-between',
  gap: '0rem',
};

export const Column = Template.bind({});
Column.args = {
  flexDirection: 'column',
};

export const MultiLine: ComponentStory<typeof Flexbox> = (args) => {
  const narrowWidthStyle = css`
    width: 100px;
    height: 300px;
    background-color: #dfdfdf;
  `;

  return (
    <Flexbox css={narrowWidthStyle} {...args}>
      {items}
    </Flexbox>
  );
};
MultiLine.args = {
  flexWrap: 'wrap',
  alignContent: 'center',
};
