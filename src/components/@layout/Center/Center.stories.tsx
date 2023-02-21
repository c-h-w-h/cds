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

export const Basic = Template.bind({});
Basic.args = {
  children: <p>안녕하세요</p>,
};

export const MultipleLines = Template.bind({});
MultipleLines.args = {
  children: (
    <div>
      hi <div>hi</div> <div>ㅗㅑ</div>
    </div>
  ),
};
