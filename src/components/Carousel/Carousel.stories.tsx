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
  const itemList = [
    {
      content: '라떼 맛있어요. 라떼 드세요.',
      img: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f990a29b-8779-4b3d-8e75-5615dbf8c015/Untitled.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230319T132219Z&X-Amz-Expires=86400&X-Amz-Signature=62b5cc4281a48c791f63991b2fd069e28728cb2f08084ebe94d06fc8e9d4ead7&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.jpeg%22&x-id=GetObject',
    },
    {
      content: '그거 아세요?',
      img: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bdcbd85d-aa05-4ed6-be8f-9b74b6c3b82b/Untitled.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230319T133118Z&X-Amz-Expires=86400&X-Amz-Signature=a1ad7ac7a953ae95807b2a51ecbf21627246307c855873cc0cf8986c0cdcd4ad&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.jpeg%22&x-id=GetObject',
    },
    {
      img: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e3e87936-ad88-4346-8d83-7b0089889ec2/Untitled.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230319T141846Z&X-Amz-Expires=86400&X-Amz-Signature=8785a3fe63f9e6417b755542b2f9df60899e42f863a9aea28a0b44884ea048e2&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.jpeg%22&x-id=GetObject',
    },
    {
      content: '커피빈은 바닐라 라떼가 맛있어요. 진짜 진짜',
      img: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/60a8eaee-e768-494f-a3ee-4d0601a2606e/Untitled.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230319T141913Z&X-Amz-Expires=86400&X-Amz-Signature=e1862ff2b9336aeda2011ea8a2fb507d4b6b0dcaf0ab3c1dea7c43c73d786366&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.jpeg%22&x-id=GetObject',
    },
    {
      content: '커피빈은 바닐라 라떼가 맛있어요. 진짜 진짜',
      img: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/60a8eaee-e768-494f-a3ee-4d0601a2606e/Untitled.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230319T141913Z&X-Amz-Expires=86400&X-Amz-Signature=e1862ff2b9336aeda2011ea8a2fb507d4b6b0dcaf0ab3c1dea7c43c73d786366&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.jpeg%22&x-id=GetObject',
    },
  ];
  return <Carousel {...args} itemList={itemList}></Carousel>;
};

export const Large = Template.bind({});

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};
