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

const BasicControlledTemplate: ComponentStory<typeof Input> = (args) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <Input {...args} inputRef={inputRef}></Input>
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

const CustomControlledTemplate: ComponentStory<typeof Input> = (args) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const templateStyle = css`
    width: 300px;
    height: 60px;
    &::placeholder {
      color: red;
      font-style: italic;
      font-size: 26px;
    }
  `;
  return (
    <>
      <Input {...args} css={templateStyle} inputRef={inputRef}></Input>
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

export const ControlledDefaultStyle = BasicControlledTemplate.bind({});
ControlledDefaultStyle.args = {
  placeholder: '입력하세요',
};

export const ControlledCustomStyle = CustomControlledTemplate.bind({});
ControlledCustomStyle.args = {
  placeholder: '입력하세요',
};
