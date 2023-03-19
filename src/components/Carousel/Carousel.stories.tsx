import { ComponentStory, ComponentMeta } from '@storybook/react';

import Carousel from '.';

export default {
  title: 'Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  itemList: [`1`, `1`, `1`, `1`, `1`],
};
