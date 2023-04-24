import Badge from '@components/Badge';
import Button from '@components/Button';
import List from '@components-layout/List';
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChildrenProps } from '@util-types/ChildrenProps';

import Drawer from '.';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Drawer는 감춰진 컨텐츠 영역이 트리거 동작에 슬라이딩 애니메이션과 함께 드러나고, dimmer 영역을 클릭해 닫을 수 있는 컴포넌트입니다.',
    docs: {
      description: {
        component:
          '메뉴 리스트, 옵션 선택 양식 등 다양한 요소가 들어갈 수 있습니다.' +
          '\n\n화면 전체 영역을 덮는 스타일을 기본으로 가집니다. 이외의 스타일링을 원한다면 Custom Parent, Mobile 스토리를 참고합니다.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Drawer 역할을 설명합니다.',
      table: {
        type: {
          summary: 'string',
          required: true,
        },
      },
    },
    position: {
      description: 'Panel 위치를 설정합니다.',
      table: {
        type: {
          summary: '"left" | "bottom"',
          required: false,
        },
        defaultValue: {
          summary: '"left"',
        },
      },
    },
    containerId: {
      description: '실제 DOM 상 Panel 부모가 될 요소의 HTML id를 전달합니다.',
      table: {
        type: {
          summary: 'string',
          required: false,
        },
        defaultValue: {
          summary: 'DRAWER_PORTAL_ROOT_ID',
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
        <StudyList />
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

export const CustomParent = Template.bind({});
CustomParent.args = {
  label: '옵션 메뉴',
  position: 'bottom',
  containerId: 'custom-story-container',
};
CustomParent.decorators = [
  (Story) => (
    <CustomContainer id="custom-story-container">{Story()}</CustomContainer>
  ),
];
CustomParent.parameters = {
  docs: {
    storyDescription:
      '`<Drawer />`가 차지할 영역을 결정하는 요소의 HTML id를 `containerId` props로 전달해 스타일 커스텀이 가능합니다. 이 경우 해당 요소에 CSS `position: relative; overflow: hidden;` 스타일이 적용됩니다.',
  },
};

export const Mobile = Template.bind({});
Mobile.args = {
  label: '옵션 메뉴',
  position: 'bottom',
  containerId: 'mobile-story-container',
};
Mobile.decorators = [
  (Story) => (
    <MobileContainer id="mobile-story-container">{Story()}</MobileContainer>
  ),
];
Mobile.parameters = {
  docs: {
    storyDescription: `containerId 기본값은 \`<CdsProvider />\` 내 Portal id입니다. \`containerId\`를 전달하지 않아도 상위에 반응형 컨테이너를 감싸 Portal 영역을 조정할 수도 있습니다.
      \n스토리를 박스 내부에서 표현하기 위해 실제 사용법과 다르게 작성되었습니다. 예시 코드는 아래 블럭을 참고하세요.
      
      const App = () => {
          return (
              <MobileContainer>
                  <CdsProvider>
                      // ... your components
                  </CdsProvider>
              </MobileContainer>
          );
      };
      `,
  },
};

const StudyList = () => {
  return (
    <List css={liStyle}>
      <li>
        <Badge>차가운 스터디</Badge>
      </li>
      <li>
        <Badge>따뜻한 스터디</Badge>
      </li>
      <li>
        <Badge>미지근한 스터디</Badge>
      </li>
    </List>
  );
};

const CustomContainer = ({ id, children }: { id: string } & ChildrenProps) => (
  <div
    id={id}
    css={css`
      width: 100%;
      height: 200px;
    `}
  >
    {children}
  </div>
);

const MobileContainer = ({ id, children }: { id: string } & ChildrenProps) => {
  return (
    <div
      id={id}
      css={css`
        position: relative;
        width: min(100vw, 375px);
        height: 812px;

        overflow: hidden;
        margin: auto;
      `}
    >
      {children}
    </div>
  );
};
