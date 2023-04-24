import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChildrenProps } from '@util-types/ChildrenProps';

import CdsBag from './CdsBag';
import CdsHamburger from './CdsHamburger';
import CdsHeart from './CdsHeart';
import CdsHome from './CdsHome';
import CdsSearch from './CdsSearch';
import CdsUser from './CdsUser';

export default {
  title: 'Components/Icon',
  component: CdsBag,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '차가운 디자인 시스템 아이콘입니다.',
    docs: {
      description: {
        component:
          '디자인 시스템 프로토타입인 커머스 UI 기준으로 필요한 아이콘들이 포함되어 있습니다.' +
          '<br />각각의 아이콘은 별도 컴포넌트이지만 동일한 props 인터페이스를 가집니다.',
      },
    },
  },
  argTypes: {
    size: {
      description: '크기를 결정합니다.',
      table: {
        type: { summary: "CSSProperties['width']", required: false },
        defaultValue: { summary: 24 },
      },
      control: {
        type: 'number',
      },
    },
    color: {
      description: '색상을 결정합니다. 기본값은 CDS 컬러 팔레트의 black입니다.',
      table: {
        type: { summary: "CSSProperties['color']", required: false },
        defaultValue: { summary: '#333333' },
      },
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof CdsBag>;

const Template: ComponentStory<typeof CdsBag> = (args) => {
  return (
    <Container>
      <CdsBag {...args} />
      <CdsHamburger {...args} />
      <CdsHeart {...args} />
      <CdsHome {...args} />
      <CdsSearch {...args} />
      <CdsUser {...args} />
    </Container>
  );
};

const Container = ({ children }: ChildrenProps) => {
  return (
    <div
      css={css`
        display: flex;
        gap: 30px;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100px;
      `}
    >
      {children}
    </div>
  );
};

export const Default = Template.bind({});
