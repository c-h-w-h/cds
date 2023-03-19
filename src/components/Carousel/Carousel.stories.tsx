import { ComponentStory, ComponentMeta } from '@storybook/react';

import Carousel from '.';

export default {
  title: 'Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = () => {
  const itemList = [
    { content: '1' },
    { content: '2' },
    { content: '3' },
    { content: '4' },
  ];
  return <Carousel itemList={itemList}></Carousel>;
};

export const Default = Template.bind({});
