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

export const TopLeftToast = Template.bind({});
TopLeftToast.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'top',
  horizontal: 'left',
};

export const TopCenterToast = Template.bind({});
TopCenterToast.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'top',
  horizontal: 'center',
};

export const TopRightToast = Template.bind({});
TopRightToast.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'top',
  horizontal: 'right',
};

export const BottomLeftToast = Template.bind({});
BottomLeftToast.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'bottom',
  horizontal: 'left',
};

export const BottomCenterToast = Template.bind({});
BottomCenterToast.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'bottom',
  horizontal: 'center',
};

export const BottomRightToast = Template.bind({});
BottomRightToast.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'bottom',
  horizontal: 'right',
};

export const WithTitleToast = Template.bind({});
WithTitleToast.args = {
  message: DUMMY_SHORT_MESSAGE,
  title: DUMMY_TITLE,
  vertical: 'top',
  horizontal: 'left',
};

export const LongMessageToast = Template.bind({});
LongMessageToast.args = {
  message: DUMMY_LONG_MESSAGE,
  vertical: 'top',
  horizontal: 'left',
};

export const InfoToast = Template.bind({});
InfoToast.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'info',
  vertical: 'top',
  horizontal: 'left',
};

export const SuccessToast = Template.bind({});
SuccessToast.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'success',
  vertical: 'top',
  horizontal: 'left',
};

export const WarningToast = Template.bind({});
WarningToast.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'warning',
  vertical: 'top',
  horizontal: 'left',
};

export const ErrorToast = Template.bind({});
ErrorToast.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'error',
  vertical: 'top',
  horizontal: 'left',
};
