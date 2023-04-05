import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Container from '.';

export default {
  title: 'Design System/Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      'Container는 박스 사이즈 안에서 children이 표시될 수 있도록 감쌉니다.',
  },
  argTypes: {
    children: {
      description: 'Container 내부에 위치하는 요소입니다.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    overflowX: {
      description:
        '너비를 초과하는 요소가 존재할 경우 어떻게 보여줄 것인지 결정합니다.',
      table: {
        type: { summary: "CSSProperties['overflowX']" },
        defaultValue: { summary: 'hidden' },
      },
      control: {
        type: 'select',
        options: ['hidden', 'visible', 'clip', 'scroll', 'auto'],
      },
    },
    overflowY: {
      description:
        '높이를 초과하는 요소가 존재할 경우 어떻게 보여줄 것인지 결정합니다.',
      table: {
        type: { summary: "CSSProperties['overflowY']" },
        defaultValue: { summary: 'hidden' },
      },
      control: {
        type: 'select',
        options: ['hidden', 'visible', 'clip', 'scroll', 'auto'],
      },
    },
  },
} as ComponentMeta<typeof Container>;

export const Default: ComponentStory<typeof Container> = (args) => {
  const DUMMY_STR =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ligula turpis, fermentum sed nisi vel, faucibus elementum neque. Morbi convallis rutrum lectus id dictum. Pellentesque euismod gravida risus pretium finibus. Pellentesque sollicitudin nunc ligula, et cursus lectus auctor et. Nullam elementum ipsum dui, in ullamcorper velit porta et. Nulla dapibus tristique convallis. Maecenas et tristique velit, non tincidunt dolor. Quisque vitae tincidunt ante. Ut interdum tellus tellus, nec vehicula metus ultricies eget. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec at purus ut justo tempor consequat. Aliquam nec iaculis mi. Donec feugiat velit tincidunt, faucibus magna ac, ullamcorper orci. Proin vitae ipsum et nulla egestas scelerisque. Etiam ac diam in diam faucibus dictum quis quis nibh.';

  return (
    <Container
      {...args}
      css={css`
        width: 300px;
        height: 300px;
        background-color: pink;
      `}
    >
      {DUMMY_STR}
    </Container>
  );
};

export const WithEnoughSpace: ComponentStory<typeof Container> = (args) => (
  <Container
    {...args}
    css={css`
      width: 300px;
      height: 300px;
    `}
  />
);

WithEnoughSpace.args = {
  children: (
    <Container
      css={css`
        background-color: pink;
      `}
    >
      <p>빈 공간이 많은 컨테이너</p>
    </Container>
  ),
};

WithEnoughSpace.parameters = {
  docs: {
    storyDescription:
      'children을 모두 표시할 정도로 너비와 높이가 충분한 경우 빈 공간이 표시됩니다.',
  },
};

export const Scrollable: ComponentStory<typeof Container> = (args) => (
  <Container
    {...args}
    css={css`
      height: 300px;
      background-color: pink;
    `}
  />
);

Scrollable.args = {
  overflowY: 'scroll',
  children: (
    <div style={{ height: '600px' }}>Container보다 세로로 더 긴 컨텐츠</div>
  ),
};

Scrollable.parameters = {
  docs: {
    storyDescription:
      '\\<Container\\>보다 children의 크기가 클 경우 overflow 속성을 "scroll"로 설정하여 넘치는 부분을 스크롤로 확인할 수 있습니다.',
  },
};
