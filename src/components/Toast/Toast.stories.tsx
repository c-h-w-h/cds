import { ComponentStory, ComponentMeta } from '@storybook/react';

import Toast from '.';

export default {
  title: 'Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Toast>;

const DUMMY_TITLE = '기본 제목을 설정할 수 있습니다.';
const DUMMY_SHORT_MESSAGE = '토스트 메세지입니다.';
const DUMMY_LONG_MESSAGE =
  '긴 토스트 메세지입니다. 현재 토스트 메세지의 최대 길이는 10vw로 설정되어 있습니다.';

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const TopLeft = Template.bind({});
TopLeft.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'top',
  horizontal: 'left',
};

export const TopCenter = Template.bind({});
TopCenter.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'top',
  horizontal: 'center',
};

export const TopRight = Template.bind({});
TopRight.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'top',
  horizontal: 'right',
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'bottom',
  horizontal: 'left',
};

export const BottomCenter = Template.bind({});
BottomCenter.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'bottom',
  horizontal: 'center',
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'bottom',
  horizontal: 'right',
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  message: DUMMY_SHORT_MESSAGE,
  title: DUMMY_TITLE,
  vertical: 'top',
  horizontal: 'left',
};

export const LongMessage = Template.bind({});
LongMessage.args = {
  message: DUMMY_LONG_MESSAGE,
  vertical: 'top',
  horizontal: 'left',
};

export const Info = Template.bind({});
Info.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'info',
  vertical: 'top',
  horizontal: 'left',
};

export const Success = Template.bind({});
Success.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'success',
  vertical: 'top',
  horizontal: 'left',
};

export const Warning = Template.bind({});
Warning.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'warning',
  vertical: 'top',
  horizontal: 'left',
};

export const Error = Template.bind({});
Error.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'error',
  vertical: 'top',
  horizontal: 'left',
};
