import Button from '@components/Button';
import { css } from '@emotion/react';
import { useRef, useState } from '@storybook/addons';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdSearch } from 'react-icons/md';

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
      <div
        css={css`
          display: flex;
        `}
      >
        <Input {...args} forwordRef={inputRef} />
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

UncontrolledDefaultStyle.args = {
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
          forwordRef={inputRef}
          css={css`
            width: 400px;
            height: 50px;
            font-size: 2rem;
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
  leadingIconSize: 30,
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
        onInputChange={({ target }) => changeHandler(target)}
        onCancelClick={() => setInputValue('')}
        isValid={isValidate}
        value={inputValue}
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
  leadingIcon: MdSearch,
};
