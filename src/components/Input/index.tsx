import styled from '@emotion/styled';
import { DefaultProps } from '@utils/types/DefaultProps';
import { ChangeEventHandler, RefObject } from 'react';

interface InputProps extends DefaultProps<HTMLInputElement> {
  placeholder?: string;
  inputRef?: RefObject<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  isValid?: boolean;
}

const Input = ({
  placeholder = '입력하세요',
  inputRef,
  onChange,
  isValid = true,
  ...props
}: InputProps) => {
  return (
    <InputContainer
      placeholder={placeholder}
      ref={inputRef}
      onChange={onChange}
      {...{ isValid }}
      {...props}
    ></InputContainer>
  );
};

const InputContainer = styled.input<Pick<InputProps, 'isValid'>>(
  ({ theme, isValid }) => {
    const { color: themeColor } = theme;
    const { primary100, error, gray200 } = themeColor;
    return {
      width: '8rem',
      height: '1.6rem',
      border: isValid ? `0.07rem solid ${gray200}` : `0.1rem solid ${error}`,
      borderRadius: '0.2rem',
      outline: 'none',
      '::placeholder': {
        color: gray200,
        fontSize: '0.8rem',
      },
      ':focus': {
        border: isValid
          ? `0.1rem solid ${primary100}`
          : `0.1rem solid ${error}`,
        transition: 'all 0.1s',
      },
    };
  },
);

export default Input;
