import Typography from '@components/Typography';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Carousel from '.';

export default {
  title: 'Design System/Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Carousel은 내부에 있는 요소들을 수평으로 배치하여 좌우로 넘기면서 확인할 수 있는 컴포넌트입니다.',
    docs: {
      description: {
        component: `- 다음과 같은 컴포넌트를 children으로 사용할 수 있습니다.  
        - \\<Carousel.Card\\> : 여러 개의 카드를 \\<Carousel\\>에 표시하고 좌우로 넘길 수 있습니다.
        - \\<Carousel.Slide\\> : 한 번에 하나의 요소가 \\<Carousel\\> 내부를 채우도록 만들 때 적용합니다.
        `,
      },
    },
  },
  argTypes: {
    line: {
      description: 'Carousel 내부 열 개수를 설정합니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    width: {
      description: 'Carousel 아이템의 너비를 px 단위로 설정합니다.',
      table: {
        type: { summary: 'number' },
      },
      control: false,
    },
    height: {
      description: 'Carousel 아이템의 높이를 px 단위로 설정합니다.',
      table: {
        type: { summary: 'number' },
      },
      control: false,
    },
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
      <Carousel.Card key={index}>
        <img src={item.imgSrc} alt="item" />
        <Typography variant="body">{item.content}</Typography>
      </Carousel.Card>
    ))}
  </Carousel>
);

export const Default = Template.bind({});

export const CarouselCard = Template.bind({});

CarouselCard.parameters = {
  docs: {
    storyDescription:
      '<Carousel.Card>를 사용한 Card 형식의 기본 Carousel입니다.',
  },
};

export const WithCustomLine = Template.bind({});
WithCustomLine.args = {
  line: 2,
};

WithCustomLine.storyName = 'With Custom Line (Card)';

WithCustomLine.parameters = {
  docs: {
    storyDescription: '사용자 지정 line 값으로 열 개수를 설정할 수 있습니다.',
  },
};

export const WithCustomSize = Template.bind({});
WithCustomSize.args = {
  width: 300,
  height: 400,
};

WithCustomSize.storyName = 'With Custom Size (Card)';

WithCustomSize.parameters = {
  docs: {
    storyDescription:
      '사용자 지정 width와 height로 내부에 표시할 아이템의 크기를 지정할 수 있습니다.',
  },
};

export const WithCustomLineAndSize = Template.bind({});
WithCustomLineAndSize.args = {
  line: 2,
  width: 300,
  height: 400,
};

WithCustomLineAndSize.storyName = 'With Custom Line And Size (Card)';

WithCustomLineAndSize.parameters = {
  docs: {
    storyDescription:
      'line, width, height 값을 모두 사용자가 지정할 수 있습니다.',
  },
};

const SlideTemplate: ComponentStory<typeof Carousel> = (args) => {
  return (
    <Carousel {...args}>
      {DUMMY_DATA.map((item, index) => (
        <Carousel.Slide key={index}>
          <img src={item.imgSrc} alt="item" />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export const CarouselSlide = SlideTemplate.bind({});

CarouselSlide.parameters = {
  docs: {
    storyDescription:
      '<Carousel.Slide>를 사용한 Slide 형식의 기본 Carousel입니다.',
  },
};

export const WidthCustomHeight = SlideTemplate.bind({});
WidthCustomHeight.args = {
  height: 500,
};

WidthCustomHeight.storyName = 'With Custom Height (Slide)';

WidthCustomHeight.parameters = {
  docs: {
    storyDescription:
      'height에 사용자 지정 값을 전달하여 Carousel 높이를 설정할 수 있습니다.',
  },
};
