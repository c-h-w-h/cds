import { ComponentStory, ComponentMeta } from '@storybook/react';

import Center from '.';

export default {
  title: 'Center',
  component: Center,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Center>;

const Template: ComponentStory<typeof Center> = (args) => <Center {...args} />;

export const Center1 = Template.bind({});
Center1.args = {
  children: <p>안녕하세요</p>,
};

export const Center2 = Template.bind({});
Center2.args = {
  children: (
    <div>
      hi <div>hi</div> <div>ㅗㅑ</div>
    </div>
  ),
};
