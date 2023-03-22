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
  },
} as ComponentMeta<typeof Select>;

export const UseState: ComponentStory<typeof Select> = () => {
  const [value, setValue] = useState('');

  return (
    <Select id="test" setValue={setValue}>
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
      <Select id="test" setValue={setValue}>
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

export const MultipleSelects: ComponentStory<typeof Select> = () => {
  const [value, setValue] = useState('');
  const [anotherValue, setAnotherValue] = useState('');

  return (
    <form onSubmit={onSubmit} css={flexboxStyle()}>
      <Select id="test" setValue={setValue}>
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
