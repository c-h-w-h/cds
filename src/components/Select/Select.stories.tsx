import Badge from '@components/Badge';
import Button from '@components/Button';
import Container from '@components-layout/Container';
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { flexboxStyle } from '@styles/flex-box';
import { FormEventHandler, useState } from 'react';

import Select from '.';

export default {
  title: 'Design System/Components/Select',
  component: Select,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: 'HTML select 태그의 기능을 제공합니다.',
    docs: {
      description: {
        component:
          '- 기본 디자인이 적용된 <Select.Trigger>와 <Select.OptionList> 영역으로 나뉩니다.\n' +
          '- <Select.OptionList> 하위에 <Select.Option> 및 <Select.OptGroup>을 사용해 원하는 옵션을 구성합니다.\n' +
          '- HTML form 요소 내부에서 사용하면 FormData API를 활용해 값을 가져올 수 있습니다.\n' +
          '\t- 이 때 select 요소는 props.id와 동일한 id, name을 가집니다.\n' +
          '\t- 여러 개의 Select를 사용한다면 각각에 고유한 id를 사용해야 합니다.\n' +
          '- 키보드 컨트롤을 제공합니다.\n' +
          '\t- 내부적으로 Dropdown 컴포넌트를 사용합니다. Dropdown.Trigger는 tabbable 요소이며 포커스가 있는 상태에서 Enter 키로 Dropdown.Menu를 열 수 있습니다.\n' +
          '\t- Tab, 위아래 화살표, Enter 키로 옵션을 이동하고 선택할 수 있습니다.\n' +
          '\t- Esc 키로 옵션 리스트를 닫을 수 있습니다.',
      },
    },
  },
  argTypes: {
    id: {
      description:
        'select 요소의 id입니다. 어떤 값인지 드러나는 이름이면 좋습니다.',
      table: {
        type: {
          summary: 'string',
          required: true,
        },
      },
    },
    setValue: {
      description:
        '선택 결과를 외부 상태에 반영하고 싶은 경우 setState 함수를 전달합니다. 옵션 A가 선택되는 경우 setValue(A)가 실행됩니다.',
      table: {
        type: {
          summary: 'Dispatch<SetStateAction<string>>',
        },
      },
    },
  },
  decorators: [
    (Story) => <Container css={containerStyle}>{Story()}</Container>,
  ],
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = useState('');

  return (
    <Select {...args} setValue={setValue}>
      <Select.Trigger>
        <Badge outline>{value ? value : 'click here'}</Badge>
      </Select.Trigger>
      <Select.OptionList>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">2</Select.Option>
        <Select.Option value="3">3</Select.Option>
      </Select.OptionList>
    </Select>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'default',
};

export const UseState = Template.bind({});
UseState.args = {
  id: 'useState',
};
UseState.parameters = {
  docs: {
    storyDescription:
      '선택된 값에 따라 상태가 변경됩니다. Badge 내부의 텍스트가 이 상태를 사용합니다.',
  },
};

export const Form: ComponentStory<typeof Select> = () => {
  const [value, setValue] = useState('');

  return (
    <form onSubmit={onSubmit} css={formStyle}>
      <Select id="form" setValue={setValue}>
        <Select.Trigger>
          <Badge outline>{value ? value : 'click here'}</Badge>
        </Select.Trigger>
        <Select.OptionList>
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
        </Select.OptionList>
      </Select>
      <Button text="submit" />
    </form>
  );
};
Form.parameters = {
  docs: {
    storyDescription:
      'form 요소로 감싼 Select 입니다. 옵션을 선택한 뒤 submit 버튼을 누르면 콘솔에서 선택한 옵션 로그를 확인할 수 있습니다.',
  },
};

export const OptGroup: ComponentStory<typeof Select> = () => {
  const [value, setValue] = useState('');

  return (
    <form onSubmit={onSubmit} css={formStyle}>
      <Select id="select" setValue={setValue}>
        <Select.Trigger>
          <Badge outline>{value ? value : 'click here'}</Badge>
        </Select.Trigger>
        <Select.OptionList>
          <Select.OptGroup label="Group 1">
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
          </Select.OptGroup>
          <Select.OptGroup label="Group 2">
            <Select.Option value="4">4</Select.Option>
            <Select.Option value="5">5</Select.Option>
            <Select.Option value="6">6</Select.Option>
          </Select.OptGroup>
        </Select.OptionList>
      </Select>
      <Button text="submit" />
    </form>
  );
};
OptGroup.parameters = {
  docs: {
    storyDescription: 'OptGroup 요소를 사용하면 옵션을 그루핑 할 수 있습니다.',
  },
};

/**
 * utils for story
 */
const flexColumn = flexboxStyle({
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const containerStyle = css`
  width: 375px;
  height: 406px;
  padding: 0 20px;
  ${flexColumn}
`;

const formStyle = css`
  width: 100%;
  ${flexColumn}
`;

const onSubmit: FormEventHandler = (e) => {
  e.preventDefault();

  const target = e.target as HTMLFormElement;
  if (!target) return;

  const formData = new FormData(target);
  console.log(...formData.entries()); // 확인용 로그
};
