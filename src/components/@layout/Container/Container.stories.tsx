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

export const Basic = Template.bind({
  css: css`
    width: 300px;
    height: 300px;
  `,
});
Basic.args = {
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

export const Scrollable = Template.bind({
  css: css`
    height: 100px;
  `,
});
Scrollable.args = {
  overflowY: 'scroll',
  children: (
    <div style={{ height: '300px' }}>Container보다 세로로 더 긴 컨텐츠</div>
  ),
};
