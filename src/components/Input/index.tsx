import styled from '@emotion/styled';
import { DefaultProps } from '@utils/types/DefaultProps';
import { ChangeEventHandler, RefObject } from 'react';

interface InputProps extends DefaultProps<HTMLInputElement> {
  placeholder?: string;
  inputRef?: RefObject<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  validate?: boolean;
}

const Input = ({
  placeholder = '입력하세요',
  inputRef,
  onChange,
  validate = true,
  ...props
}: InputProps) => {
  return (
    <InputContainer
      placeholder={placeholder}
      ref={inputRef}
      onChange={onChange}
      {...{ validate }}
      {...props}
    ></InputContainer>
  );
};

const InputContainer = styled.input<Pick<InputProps, 'validate'>>(
  ({ theme, validate }) => {
    const { color: themeColor } = theme;
    const { primary100, error, gray200 } = themeColor;
    return {
      width: '8rem',
      height: '1.6rem',
      border: validate ? `0.07rem solid ${gray200}` : `0.1rem solid ${error}`,
      borderRadius: '0.2rem',
      outline: 'none',
      '::placeholder': {
        color: gray200,
        fontSize: '0.8rem',
      },
      ':focus': {
        border: validate
          ? `0.1rem solid ${primary100}`
          : `0.1rem solid ${error}`,
        transition: 'all 0.1s',
      },
    };
  },
);

export default Input;
