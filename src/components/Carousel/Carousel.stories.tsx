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

const Template: ComponentStory<typeof Carousel> = (args) => {
  return (
    <Carousel {...args}>
      <Carousel.Card>
        <img
          src="https://user-images.githubusercontent.com/81913106/226325428-7909f3c2-4790-4c8b-ba2c-6ada349cb33d.png"
          alt="item"
        />
        <Typography variant="body">라떼 맛있어요. 라떼 드세요.</Typography>
      </Carousel.Card>
      <Carousel.Card>
        <img
          src="https://user-images.githubusercontent.com/81913106/226325359-61a46055-feca-4c9a-91f0-217f90b16bec.png"
          alt="item"
        />
        <Typography variant="body">라떼 맛있어요. 라떼 드세요.</Typography>
      </Carousel.Card>
      <Carousel.Card>
        <img
          src="https://user-images.githubusercontent.com/81913106/226325119-c56caff9-da50-4c2d-bd5a-7ba822316c4d.png"
          alt="item"
        />
      </Carousel.Card>
      <Carousel.Card>
        <img
          src="https://user-images.githubusercontent.com/81913106/226325071-2d690efc-0274-4778-a5e6-36a9f35a43ba.png"
          alt="item"
        />
        <Typography variant="body">라떼 맛있어요. 라떼 드세요.</Typography>
      </Carousel.Card>
      <Carousel.Card>
        <img
          src="https://user-images.githubusercontent.com/81913106/226325071-2d690efc-0274-4778-a5e6-36a9f35a43ba.png"
          alt="item"
        />
        <Typography variant="body">라떼 맛있어요. 라떼 드세요.</Typography>
      </Carousel.Card>
      <Carousel.Card>
        <img
          src="https://user-images.githubusercontent.com/81913106/226325071-2d690efc-0274-4778-a5e6-36a9f35a43ba.png"
          alt="item"
        />
        <div>라떼 맛있어요. 라떼 드세요. 우아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ</div>
      </Carousel.Card>
      <Carousel.Card>
        <img
          src="https://user-images.githubusercontent.com/81913106/226325071-2d690efc-0274-4778-a5e6-36a9f35a43ba.png"
          alt="item"
        />
        <Typography variant="body">라떼 맛있어요. 라떼 드세요.</Typography>
      </Carousel.Card>
    </Carousel>
  );
};

export const InlineDefault = Template.bind({});
export const InlineCustom = Template.bind({});
InlineCustom.args = {
  cardWidth: 300,
  cardHeight: 400,
};

export const Grid = Template.bind({});
Grid.args = {
  cardSize: 'grid',
  cardWidth: 300,
  cardHeight: 400,
};
