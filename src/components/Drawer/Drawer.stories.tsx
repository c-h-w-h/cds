import Badge from '@components/Badge';
import Button from '@components/Button';
import CdsProvider from '@components-common/CdsProvider';
import List from '@components-layout/List';
import MobileContainer from '@components-layout/MobileContainer';
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Drawer from '.';

export default {
  title: 'Design System/Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Drawer는 감춰진 컨텐츠 영역이 트리거 동작에 슬라이딩 애니메이션과 함께 드러나고, dimmer 영역을 클릭해 닫을 수 있는 컴포넌트입니다.',
    docs: {
      description: {
        component:
          '- 메뉴 리스트, 옵션 선택 양식 등 다양한 요소가 들어갈 수 있습니다.' +
          '\n- 컴포넌트 특성 상 스타일이 컨테이너와 결합되어 있습니다. 반응형을 고려해 개발한다면 Mobile 스토리를 참고해주세요.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Drawer 역할을 설명합니다.',
    },
    position: {
      description: 'Panel 위치를 설정합니다.',
      table: {
        type: {
          name: 'string',
          required: false,
        },
        defaultValue: {
          summary: '"left"',
        },
      },
    },
  },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => {
  return (
    <Drawer {...args}>
      <Drawer.Trigger>
        <Button text="서랍을 열어요" />
      </Drawer.Trigger>
      <Drawer.Panel>
        <List css={liStyle}>
          <li>
            <Badge>1</Badge>
          </li>
          <li>
            <Badge>2</Badge>
          </li>

          <li>
            <Badge>3</Badge>
          </li>
        </List>
      </Drawer.Panel>
    </Drawer>
  );
};
const liStyle = css`
  & > li {
    width: 150px;
    display: flex;
    justify-content: center;
  }
`;

export const Default = Template.bind({});
Default.args = {
  label: '옵션 메뉴',
};
Default.parameters = {
  docs: {
    storyDescription: 'Trigger 요소를 누르면 Panel이 열립니다.',
  },
};

export const Bottom = Template.bind({});
Bottom.args = {
  label: '옵션 메뉴',
  position: 'bottom',
};
Bottom.parameters = {
  docs: {
    storyDescription: 'position props를 통해 방향을 설정할 수 있습니다.',
  },
};

export const Mobile = Template.bind({});
Mobile.args = {
  label: '옵션 메뉴',
  position: 'bottom',
};
Mobile.parameters = {
  docs: {
    storyDescription:
      'Show Code 예시처럼 반응형 컨테이너를 CdsProvider 부모 컴포넌트로 두는 것을 권장합니다.',
  },
};
Mobile.decorators = [
  (Story) => (
    <MobileContainer>
      <CdsProvider>{Story()}</CdsProvider>
    </MobileContainer>
  ),
];
