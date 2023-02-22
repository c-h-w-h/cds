import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import List from '.';

export default {
  title: 'List',
  component: List,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => {
  return (
    <List {...args}>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
    </List>
  );
};

const commonStyle = css`
  width: 300px;
  background-color: #dfdfdf;
`;

export const Basic = Template.bind({});
Basic.args = {
  css: commonStyle,
};

export const MultiLine = Template.bind({});
MultiLine.args = {
  wrap: 'wrap',
  alignContent: 'space-around',
  css: [
    commonStyle,
    css`
      height: 100px;
    `,
  ],
};
