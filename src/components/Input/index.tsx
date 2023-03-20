import styled from '@emotion/styled';
import { DefaultProps } from '@utils/types/DefaultProps';
import { ChangeEventHandler, RefObject } from 'react';

interface InputProps extends DefaultProps<HTMLInputElement> {
  placeholder?: string;
  forwordRef?: RefObject<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  isValid?: boolean;
  id: string;
  name?: string;
}

const Input = ({
  placeholder = '입력하세요',
  forwordRef,
  isValid = true,
  id,
  name,
  ...props
}: InputProps) => {
  return (
    <InputContainer
      ref={forwordRef}
      name={name ? name : id}
      {...{ isValid, placeholder, id, ...props }}
    />
  );
};

const InputContainer = styled.input<Pick<InputProps, 'isValid'>>(
  ({ theme, isValid }) => {
    const { color: themeColor } = theme;
    const { primary100, error, gray200 } = themeColor;
    return {
      width: '8rem',
      height: '1.6rem',
      border: `0.1rem solid ${isValid ? primary100 : error}`,
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
