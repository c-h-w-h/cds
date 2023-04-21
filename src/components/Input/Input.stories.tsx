import Button from '@components/Button';
import { css } from '@emotion/react';
import { useRef, useState } from '@storybook/addons';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useEffect } from 'react';
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
          ref={inputRef}
          defaultValue="안녕"
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

export const Controlled: ComponentStory<typeof Input> = (args) => {
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
  leadingIcon: MdSearch,
};
