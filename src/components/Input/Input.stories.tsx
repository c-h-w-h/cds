import Button from '@components/Button';
import { css } from '@emotion/react';
import { useRef, useState } from '@storybook/addons';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useEffect } from 'react';
import { MdSearch, MdCancel } from 'react-icons/md';

import Input from '.';

export default {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Input>;

export const Uncontrolled: ComponentStory<typeof Input> = (args) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <div
        css={css`
          display: flex;
        `}
      >
        <Input {...args} ref={inputRef} />
        <Button
          onClick={() =>
            setInputValue(inputRef.current ? inputRef.current.value : '')
          }
          text="제출"
        ></Button>
      </div>
      <div>{inputValue}</div>
    </>
  );
};

Uncontrolled.args = {
  placeholder: '입력하세요',
  id: 'uncontrolled',
};

export const UncontrolledWithDefaultValue: ComponentStory<typeof Input> = (
  args,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <div
        css={css`
          display: flex;
        `}
      >
        <Input {...args} ref={inputRef} defaultValue="초기값" />
        <Button
          onClick={() =>
            setInputValue(inputRef.current ? inputRef.current.value : '')
          }
          text="제출"
        ></Button>
      </div>
      <div>{inputValue}</div>
    </>
  );
};

UncontrolledWithDefaultValue.args = {
  placeholder: '입력하세요',
  id: 'uncontrolled',
};

export const UncontrolledCustomStyle: ComponentStory<typeof Input> = (args) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <div
        css={css`
          display: flex;
        `}
      >
        <Input
          {...args}
          ref={inputRef}
          css={css`
            font-size: 1.5rem;
          `}
        />
        <Button
          onClick={() =>
            setInputValue(inputRef.current ? inputRef.current.value : '')
          }
          text="제출"
        ></Button>
      </div>
      <div>{inputValue}</div>
    </>
  );
};
UncontrolledCustomStyle.args = {
  placeholder: '입력하세요',
  id: 'uncontrolled',
  leadingIcon: MdSearch,
};

const ControlledTemplate: ComponentStory<typeof Input> = (args) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValidate, setIsValidate] = useState<boolean>(true);

  useEffect(() => {
    if (inputValue.length < 5 && inputValue.length > 0) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  }, [inputValue]);

  return (
    <>
      <Input
        {...args}
        onChange={({ target }) => setInputValue(target.value)}
        isControlled
        isValid={isValidate}
      />
      {!isValidate && (
        <div style={{ color: 'red', fontSize: '10px' }}>
          5글자 이상 입력하세요.
        </div>
      )}
      <div>{inputValue}</div>
    </>
  );
};
export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  placeholder: '입력하세요',
  id: 'controlled',
};

export const ControlledWithLeadingIcon = ControlledTemplate.bind({});
ControlledWithLeadingIcon.args = {
  placeholder: '입력하세요',
  id: 'controlled',
  leadingIcon: MdSearch,
};

export const ControlledWithValue = ControlledTemplate.bind({});
ControlledWithValue.args = {
  placeholder: '입력하세요',
  id: 'controlled',
  value: '초기값',
  leadingIcon: MdSearch,
};

export const ControlledWithCancel: ComponentStory<typeof Input> = (args) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValidate, setIsValidate] = useState<boolean>(true);

  useEffect(() => {
    if (inputValue.length < 5 && inputValue.length > 0) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  }, [inputValue]);

  return (
    <>
      <Input
        {...args}
        onChange={({ target }) => setInputValue(target.value)}
        onCancel={() => setInputValue('')}
        isControlled
        isValid={isValidate}
      />
      {!isValidate && (
        <div style={{ color: 'red', fontSize: '10px' }}>
          5글자 이상 입력하세요.
        </div>
      )}
      <div>{inputValue}</div>
    </>
  );
};

ControlledWithCancel.args = {
  placeholder: '입력하세요',
  id: 'controlled',
  leadingIcon: MdSearch,
  cancelIcon: MdCancel,
};
