import Container from '@components-layout/Container';
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdCelebration, MdInfo, MdCheckCircle } from 'react-icons/md';

import Tabs from '.';

export default {
  title: 'Tabs',
  component: Tabs,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Tabs>;

const DUMMY_STR_1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est velit egestas dui id ornare arcu odio. Aliquet nibh praesent tristique magna sit. Mollis aliquam ut porttitor leo a diam sollicitudin. Diam maecenas sed enim ut sem viverra aliquet. Lorem ipsum dolor sit amet consectetur adipiscing. Lacinia at quis risus sed vulputate odio ut. Faucibus ornare suspendisse sed nisi lacus sed viverra. Vulputate enim nulla aliquet porttitor. Nunc vel risus commodo viverra maecenas. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Netus et malesuada fames ac turpis egestas maecenas pharetra convallis. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus. Lacus vestibulum sed arcu non odio euismod. Elit pellentesque habitant morbi tristique senectus et netus et. Dui accumsan sit amet nulla facilisi morbi tempus. Libero nunc consequat interdum varius sit amet mattis vulputate. Ultricies integer quis auctor elit sed vulputate mi. Aliquam purus sit amet luctus.';
const DUMMY_STR_2 =
  'Ut porttitor leo a diam sollicitudin tempor. Mattis aliquam faucibus purus in massa tempor nec feugiat. Congue eu consequat ac felis. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. Euismod in pellentesque massa placerat duis ultricies lacus sed turpis. Metus aliquam eleifend mi in nulla posuere sollicitudin. Arcu dui vivamus arcu felis bibendum ut tristique. Magna etiam tempor orci eu lobortis elementum nibh tellus. Euismod nisi porta lorem mollis aliquam ut porttitor leo a. Nisl tincidunt eget nullam non nisi est sit amet. Ut consequat semper viverra nam libero justo laoreet sit. Quis risus sed vulputate odio ut enim. Tincidunt ornare massa eget egestas. Id cursus metus aliquam eleifend. Blandit cursus risus at ultrices mi. Arcu cursus vitae congue mauris rhoncus aenean vel. Arcu risus quis varius quam quisque id.';
const DUMMY_STR_3 =
  'Enim diam vulputate ut pharetra sit amet. Amet mauris commodo quis imperdiet massa tincidunt nunc. Venenatis cras sed felis eget velit aliquet. Suspendisse interdum consectetur libero id. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Sit amet cursus sit amet dictum sit amet justo donec. Consequat mauris nunc congue nisi vitae. Cras tincidunt lobortis feugiat vivamus at augue eget arcu. Nullam eget felis eget nunc lobortis mattis. Tortor posuere ac ut consequat. Ornare arcu odio ut sem. Ante metus dictum at tempor commodo ullamcorper a lacus. Ut porttitor leo a diam sollicitudin. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus. Mattis molestie a iaculis at erat. Ut eu sem integer vitae justo eget magna fermentum iaculis. Quam adipiscing vitae proin sagittis nisl.';

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <Tabs.List>
      <Tabs.Trigger value="1" text="메인" />
      <Tabs.Trigger value="2" text="이벤트" />
      <Tabs.Trigger value="3" text="설정" />
    </Tabs.List>
    <Tabs.Panel value="1">
      <span>첫번째 탭</span>
      <div>{DUMMY_STR_1}</div>
    </Tabs.Panel>
    <Tabs.Panel value="2">
      <span>두번째 탭</span>
      <div>{DUMMY_STR_2}</div>
    </Tabs.Panel>
    <Tabs.Panel value="3">
      <span>세번째 탭</span>
      <div>{DUMMY_STR_3}</div>
    </Tabs.Panel>
  </Tabs>
);

export const Default = Template.bind({});
Default.args = {
  label: '기본 Tabs 목록',
  defaultValue: '1',
};

export const Rounded = Template.bind({});
Rounded.args = {
  label: '둥근 Tabs 목록',
  defaultValue: '1',
  variant: 'rounded',
};

export const UnderlineFitted = Template.bind({});
UnderlineFitted.args = {
  label: '밑줄이 있으면서 너비가 꽉 찬 Tabs 목록',
  defaultValue: '1',
  variant: 'underline',
  isFitted: true,
};

export const RoundedFitted = Template.bind({});
RoundedFitted.args = {
  label: '둥글면서 너비가 꽉 찬 Tabs 목록',
  defaultValue: '1',
  variant: 'rounded',
  isFitted: true,
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  label: '기본 값이 설정된 Tabs 목록',
  defaultValue: '3',
};

const WithIconsTemplate: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <Tabs.List>
      <Tabs.Trigger value="1" icon={MdCelebration} text="축하" />
      <Tabs.Trigger value="2" icon={MdInfo} text="정보" />
      <Tabs.Trigger value="3" icon={MdCheckCircle} text="확인" />
    </Tabs.List>
  </Tabs>
);

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {
  label: '아이콘 확인용 Tabs 목록',
  defaultValue: '1',
};

const WithDisabledTemplate: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <Tabs.List>
      <Tabs.Trigger value="1" icon={MdCelebration} text="축하" />
      <Tabs.Trigger value="2" icon={MdInfo} text="정보" disabled />
      <Tabs.Trigger value="3" icon={MdCheckCircle} text="확인" />
    </Tabs.List>
  </Tabs>
);

export const WithDisabled = WithDisabledTemplate.bind({});
WithDisabled.args = {
  label: '비활성화 확인용 Tabs 목록',
  defaultValue: '1',
};

const ScrollableTemplate: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <Tabs.List>
      <Tabs.Trigger value="1" text="축하하는 탭을 띄우기 위한 트리거입니다." />
      <Tabs.Trigger
        value="2"
        text="정보를 표시하기 위해서 여기를 클릭하세요."
      />
      <Tabs.Trigger value="3" text="아무튼 길어지면 스크롤이 생기겠죠?" />
      <Tabs.Trigger value="4" text="여기까지 보이시면 너비를 줄여주시겠어요?" />
    </Tabs.List>
  </Tabs>
);

export const Scrollable = ScrollableTemplate.bind({});
Scrollable.args = {
  label: '스크롤이 생기는 Tabs 목록',
  defaultValue: '1',
};

const FocusSelectedTemplate: ComponentStory<typeof Tabs> = (args) => (
  <Container
    css={css`
      width: 360px;
    `}
  >
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Trigger value="1" text="New!!" />
        <Tabs.Trigger value="2" text="~Hot~" />
        <Tabs.Trigger value="3" text="상의" />
        <Tabs.Trigger value="4" text="아우터" />
        <Tabs.Trigger value="5" text="맨투맨" />
        <Tabs.Trigger value="6" text="반팔" />
        <Tabs.Trigger value="7" text="롱슬리브" />
        <Tabs.Trigger value="8" text="하의" />
        <Tabs.Trigger value="9" text="반바지" />
        <Tabs.Trigger value="10" text="슬랙스" />
      </Tabs.List>
    </Tabs>
  </Container>
);

export const FocusSelected = FocusSelectedTemplate.bind({});
FocusSelected.args = {
  label: '너비가 좁은 Tabs 목록',
  defaultValue: '1',
};