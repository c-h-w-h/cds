import Typography from '@components/Typography';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Carousel from '.';

export default {
  title: 'Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Carousel>;

const DUMMY_DATA = [
  {
    imgSrc:
      'https://user-images.githubusercontent.com/81913106/226325428-7909f3c2-4790-4c8b-ba2c-6ada349cb33d.png',
    content: '라떼 맛있어요. 라떼 드세요.',
  },
  {
    imgSrc:
      'https://user-images.githubusercontent.com/81913106/226325359-61a46055-feca-4c9a-91f0-217f90b16bec.png',
    content: '라떼 맛있어요. 라떼 드세요.',
  },
  {
    imgSrc:
      'https://user-images.githubusercontent.com/81913106/226325119-c56caff9-da50-4c2d-bd5a-7ba822316c4d.png',
    content: '라떼 맛있어요. 라떼 드세요.',
  },
  {
    imgSrc:
      'https://user-images.githubusercontent.com/81913106/226325071-2d690efc-0274-4778-a5e6-36a9f35a43ba.png',
    content: '라떼 맛있어요. 라떼 드세요.',
  },
  {
    imgSrc:
      'https://user-images.githubusercontent.com/81913106/226325428-7909f3c2-4790-4c8b-ba2c-6ada349cb33d.png',
    content: '라떼 맛있어요. 라떼 드세요.',
  },
];

const Template: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args}>
    {DUMMY_DATA.map((item, index) => (
      <Carousel.Card key={`${JSON.stringify(item) + index}`}>
        <img src={item.imgSrc} alt="item" />
        <Typography variant="body">{item.content}</Typography>
      </Carousel.Card>
    ))}
  </Carousel>
);

const SlideTemplate: ComponentStory<typeof Carousel> = (args) => {
  return (
    <Carousel {...args}>
      {DUMMY_DATA.map((item, index) => (
        <Carousel.Slide key={`${JSON.stringify(item) + index}`}>
          <img src={item.imgSrc} alt="item" />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export const Inline = Template.bind({});
export const InlineCustom = Template.bind({});
InlineCustom.args = {
  cardWidth: 300,
  cardHeight: 400,
};

export const TwoLine = Template.bind({});
TwoLine.args = {
  line: 2,
};
export const TwoLineCustom = Template.bind({});
TwoLineCustom.args = {
  line: 2,
  cardWidth: 300,
  cardHeight: 400,
};

export const MultiLine = Template.bind({});
MultiLine.args = {
  line: 3,
};

export const Slide = SlideTemplate.bind({});
Slide.args = {
  slideHeight: 500,
};
