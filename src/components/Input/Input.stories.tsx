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

export const UncontrolledDefaultStyle: ComponentStory<typeof Input> = (
  args,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <Input {...args} forwordRef={inputRef} />
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

UncontrolledDefaultStyle.args = {
  placeholder: '입력하세요',
  id: 'uncontrolled',
};

export const UncontrolledCustomStyle: ComponentStory<typeof Input> = (args) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <Input
        {...args}
        forwordRef={inputRef}
        css={css`
          width: 300px;
          height: 34px;
          &::placeholder {
            color: violet;
            font-style: italic;
          }
        `}
      />
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
UncontrolledCustomStyle.args = {
  placeholder: '입력하세요',
  id: 'uncontrolled',
};

export const Controlled: ComponentStory<typeof Input> = (args) => {
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

Controlled.args = {
  placeholder: '입력하세요',
  id: 'controlled',
};