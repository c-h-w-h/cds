import Button from '@components/Button';
import Flexbox from '@components-layout/Flexbox';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { default as Toast } from './ToastCore';
import useToast from './useToast';

export default {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Toast는 다양한 알림 유형을 제공하여 사용자에게 정보를 전달할 때 사용합니다.',
    docs: {
      description: {
        component:
          `- kind 값으로 "alert" | "info" | "success" | "warning" | "error" 중 하나를 선택할 수 있습니다. \n` +
          `- vertical 값으로 "top" | "bottom" 중 하나를 선택할 수 있습니다. \n` +
          `- horizontal 값으로 "left" | "right" | "center" 중 하나를 선택할 수 있습니다.`,
      },
    },
  },
  argTypes: {
    message: {
      description: 'Toast에서 표시할 내용입니다.',
      table: {
        type: { summary: 'string', required: true },
      },
    },
    vertical: {
      description: '수직 방향의 위치를 결정합니다.',
      table: {
        type: { summary: 'VerticalVariant', required: true },
      },
      control: {
        type: 'select',
        options: ['top', 'bottom'],
      },
    },
    horizontal: {
      description: '수평 방향의 위치를 결정합니다.',
      table: {
        type: { summary: 'HorizontalVariant', required: true },
      },
      control: {
        type: 'select',
        options: ['left', 'right', 'center'],
      },
    },
    open: {
      description: 'Toast가 화면에 나타나는지 여부를 결정합니다.',
      table: {
        type: { summary: 'boolean', required: true },
      },
      control: false,
    },
    onClose: {
      description: '닫기 버튼을 눌렀을 때 동작하는 함수입니다.',
      table: {
        type: { summary: 'function', required: true },
      },
      control: false,
    },
    title: {
      description: 'Toast에서 표시할 내용 중 제목을 전달합니다.',
      table: {
        type: { summary: 'string' },
      },
      control: {
        type: 'text',
      },
    },
    kind: {
      description: 'Toast의 유형을 결정합니다.',
      table: {
        type: { summary: 'ToastKind' },
        defaultValue: { summary: 'alert' },
      },
      control: {
        type: 'select',
        options: ['alert', 'info', 'success', 'warning', 'error'],
      },
    },
    duration: {
      description: '지속시간을 설정합니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 3000 },
      },
      control: {
        type: 'number',
        min: 1000,
        step: 1000,
      },
    },
  },
} as ComponentMeta<typeof Toast>;

const DUMMY_TITLE = '기본 제목을 설정할 수 있습니다.';
const DUMMY_SHORT_MESSAGE = '토스트 메세지입니다.';
const DUMMY_LONG_MESSAGE =
  '긴 토스트 메세지입니다. 현재 토스트 메세지의 최대 길이는 10vw로 설정되어 있습니다.';

const Template: ComponentStory<typeof Toast> = (args) => {
  const { openToast, toastProps } = useToast();

  return (
    <Flexbox
      justifyContent={'center'}
      alignItems={'center'}
      style={{
        height: '250px',
      }}
    >
      <Button text="열려라 참깨" onClick={openToast} />
      <Toast {...args} {...toastProps} />
    </Flexbox>
  );
};

export const Default = Template.bind({});
Default.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'top',
  horizontal: 'left',
};

export const Alert = Template.bind({});
Alert.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'alert',
  vertical: 'top',
  horizontal: 'left',
};

Alert.parameters = {
  docs: {
    storyDescription:
      '"alert"는 기본 Toast 유형입니다. 색상은 검정색을 사용합니다.',
  },
};

export const Info = Template.bind({});
Info.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'info',
  vertical: 'top',
  horizontal: 'left',
};

Info.parameters = {
  docs: {
    storyDescription:
      '"info"는 정보를 알리기 위한 Toast 유형입니다. 색상은 파란색을 사용합니다.',
  },
};

export const Success = Template.bind({});
Success.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'success',
  vertical: 'top',
  horizontal: 'left',
};

Success.parameters = {
  docs: {
    storyDescription:
      '"success"는 성공을 알리기 위한 Toast 유형입니다. 색상은 초록색을 사용합니다.',
  },
};

export const Warning = Template.bind({});
Warning.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'warning',
  vertical: 'top',
  horizontal: 'left',
};

Warning.parameters = {
  docs: {
    storyDescription:
      '"warning"은 경고를 알리기 위한 Toast 유형입니다. 색상은 노란색을 사용합니다.',
  },
};

export const Error = Template.bind({});
Error.args = {
  message: DUMMY_SHORT_MESSAGE,
  kind: 'error',
  vertical: 'top',
  horizontal: 'left',
};

Error.parameters = {
  docs: {
    storyDescription:
      '"error"는 에러를 알리기 위한 Toast 유형입니다. 색상은 빨간색을 사용합니다.',
  },
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  message: DUMMY_SHORT_MESSAGE,
  title: DUMMY_TITLE,
  vertical: 'top',
  horizontal: 'left',
};

WithTitle.parameters = {
  docs: {
    storyDescription:
      'title 속성으로 사용자가 Toast의 제목을 설정할 수 있습니다.',
  },
};

export const LongMessage = Template.bind({});
LongMessage.args = {
  message: DUMMY_LONG_MESSAGE,
  vertical: 'top',
  horizontal: 'left',
};

LongMessage.parameters = {
  docs: {
    storyDescription:
      'message 내용이 길 경우 Toast의 최대 너비는 뷰포트 너비의 10%까지 확장됩니다.',
  },
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'top',
  horizontal: 'left',
};

TopLeft.parameters = {
  docs: {
    storyDescription:
      'vertical 값은 "top"이고 horizontal 값은 "left"인 경우 Toast는 좌상단에 위치합니다.',
  },
};

export const TopCenter = Template.bind({});
TopCenter.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'top',
  horizontal: 'center',
};

TopCenter.parameters = {
  docs: {
    storyDescription:
      'vertical 값은 "top"이고 horizontal 값은 "center"인 경우 Toast는 상단 중앙에 위치합니다.',
  },
};

export const TopRight = Template.bind({});
TopRight.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'top',
  horizontal: 'right',
};

TopRight.parameters = {
  docs: {
    storyDescription:
      'vertical 값은 "top"이고 horizontal 값은 "right"인 경우 Toast는 우상단에 위치합니다.',
  },
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'bottom',
  horizontal: 'left',
};

BottomLeft.parameters = {
  docs: {
    storyDescription:
      'vertical 값은 "bottom"이고 horizontal 값은 "left"인 경우 Toast는 좌하단에 위치합니다.',
  },
};

export const BottomCenter = Template.bind({});
BottomCenter.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'bottom',
  horizontal: 'center',
};

BottomCenter.parameters = {
  docs: {
    storyDescription:
      'vertical 값은 "bottom"이고 horizontal 값은 "center"인 경우 Toast는 하단 중앙에 위치합니다.',
  },
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  message: DUMMY_SHORT_MESSAGE,
  vertical: 'bottom',
  horizontal: 'right',
};

BottomRight.parameters = {
  docs: {
    storyDescription:
      'vertical 값은 "bottom"이고 horizontal 값은 "right"인 경우 Toast는 우하단에 위치합니다.',
  },
};

export const WithToastHook = Template.bind({});
WithToastHook.args = {
  message: 'X 버튼을 누르면 사라져요.',
  kind: 'info',
  vertical: 'top',
  horizontal: 'center',
};

WithToastHook.parameters = {
  docs: {
    storyDescription:
      'Toast를 호출할 수 있는 useToast Hook을 Button에 등록할 수 있습니다.',
  },
};

export const CustomDuration = Template.bind({});
CustomDuration.args = {
  message: '10초동안 보입니다.',
  kind: 'info',
  vertical: 'top',
  horizontal: 'center',
  duration: 10000,
};

CustomDuration.parameters = {
  docs: {
    storyDescription:
      'duration 값을 변경하면 Toast가 자동으로 사라지기까지의 시간을 설정할 수 있습니다.',
  },
};
