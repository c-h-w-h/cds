import { css } from '@emotion/react';
import { useRef, useState } from '@storybook/addons';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from '.';

export default {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Input>;

const UncontrolledTemplate: ComponentStory<typeof Input> = (args) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <Input {...args} ref={inputRef}></Input>
      <button
        type="submit"
        onClick={() =>
          setInputValue(inputRef.current ? inputRef.current.value : '')
        }
      >
        제출
      </button>
      <div>{inputValue}</div>
    </>
  );
};

const ControlledTemplate: ComponentStory<typeof Input> = (args) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValidate, setIsValidate] = useState<boolean>(true);
  const validateHandler = (target: EventTarget & HTMLInputElement) => {
    if (target.value.length < 5) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  };
  const changeHandler = (target: EventTarget & HTMLInputElement) => {
    validateHandler(target);
    setInputValue(target.value);
  };
  return (
    <>
      <Input
        {...args}
        onChange={({ target }) => changeHandler(target)}
        isValid={isValidate}
      ></Input>
      {!isValidate && (
        <div style={{ color: 'red', fontSize: '10px' }}>
          5글자 이상 입력하세요.
        </div>
      )}
      <div>{inputValue}</div>
    </>
  );
};

export const UncontrolledDefaultStyle = UncontrolledTemplate.bind({});
UncontrolledDefaultStyle.args = {
  placeholder: '입력하세요',
};

export const UncontrolledCustomStyle = UncontrolledTemplate.bind({});
UncontrolledCustomStyle.args = {
  placeholder: '입력하세요',
  css: css`
    width: 300px;
    height: 34px;
    &::placeholder {
      color: violet;
      font-style: italic;
    }
  `,
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  placeholder: '입력하세요',
  css: css`
    margin: 20px;
  `,
};
