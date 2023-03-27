import Badge from '@components/Badge';
import Button from '@components/Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { flexboxStyle } from '@styles/flex-box';
import { FormEventHandler, useState } from 'react';

import Select from '.';

export default {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: 'HTML select 태그의 기능을 제공합니다.',
  },
  argTypes: {
    id: {
      label: 'id',
      type: {
        name: 'string',
        required: true,
      },
      description:
        'select 요소의 id입니다. 어떤 값인지 드러나는 이름이면 좋습니다.',
    },
    setValue: {
      label: 'setValue',
      description:
        'setState 함수입니다. 옵션 A가 선택되는 경우 setValue(A)가 실행됩니다. 옵셔널 props입니다.',
    },
  },
} as ComponentMeta<typeof Select>;

export const Template: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = useState('');

  return (
    <Select {...args} setValue={setValue}>
      <Select.Trigger>
        <Badge outline>{value ? value : 'click here'}</Badge>
      </Select.Trigger>
      <Select.Options>
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">2</Select.Option>
        <Select.Option value="3">3</Select.Option>
      </Select.Options>
    </Select>
  );
};
Template.args = {
  id: 'template',
};

export const UseState = Template.bind({});
UseState.args = {
  id: 'useState',
};
UseState.parameters = {
  docs: {
    storyDescription:
      '선택 결과를 상태에 반영하고 싶은 경우 props.setValue에 setState 함수를 전달합니다.',
  },
};

const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault();

  const target = e.target as HTMLFormElement;
  if (!target) return;

  const formData = new FormData(target);
  console.log(...formData.entries()); // 확인용 로그
};

export const Form: ComponentStory<typeof Select> = () => {
  const [value, setValue] = useState('');

  return (
    <form onSubmit={onSubmit} css={flexboxStyle()}>
      <Select id="form" setValue={setValue}>
        <Select.Trigger>
          <Badge outline>{value ? value : 'click here'}</Badge>
        </Select.Trigger>
        <Select.Options>
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
        </Select.Options>
      </Select>
      <Button text="submit" />
    </form>
  );
};
Form.parameters = {
  docs: {
    storyDescription:
      'HTML form 요소 내부에서 사용하면 FormData API를 활용해 값을 가져올 수 있습니다. 이 때 select 요소는 props.id와 동일한 name을 가집니다.',
  },
};

export const MultipleSelects: ComponentStory<typeof Select> = () => {
  const [value, setValue] = useState('');
  const [anotherValue, setAnotherValue] = useState('');

  return (
    <form onSubmit={onSubmit} css={flexboxStyle()}>
      <Select id="select" setValue={setValue}>
        <Select.Trigger>
          <Badge outline>{value ? value : 'click here'}</Badge>
        </Select.Trigger>
        <Select.Options>
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
        </Select.Options>
      </Select>

      <Select id="another" setValue={setAnotherValue}>
        <Select.Trigger>
          <Badge outline>{anotherValue ? anotherValue : 'click here'}</Badge>
        </Select.Trigger>
        <Select.Options>
          <Select.Option value="first">first</Select.Option>
          <Select.Option value="second">second</Select.Option>
          <Select.Option value="third">third</Select.Option>
        </Select.Options>
      </Select>

      <Button text="submit" />
    </form>
  );
};
MultipleSelects.parameters = {
  docs: {
    storyDescription:
      '서로 다른 id를 가지는 여러 개의 select를 사용할 수 있습니다.',
  },
};
