import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Container from '.';

export default {
  title: 'Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  css: css`
    width: 300px;
    height: 300px;
  `,
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

export const Scrollable = Template.bind({});
Scrollable.args = {
  overflowY: 'scroll',
  css: css`
    height: 100px;
  `,
  children: (
    <div style={{ height: '300px' }}>Container보다 세로로 더 긴 컨텐츠</div>
  ),
};
