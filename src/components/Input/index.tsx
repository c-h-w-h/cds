import styled from '@emotion/styled';
import { DefaultProps } from '@utils/types/DefaultProps';
import { RefObject } from 'react';

interface InputProps extends DefaultProps<HTMLInputElement> {
  placeholder?: string;
  inputRef?: RefObject<HTMLInputElement>;
}

const Input = ({
  placeholder = '입력하세요',
  inputRef,
  ...props
}: InputProps) => {
  return (
    <InputContainer
      placeholder={placeholder}
      ref={inputRef}
      {...props}
    ></InputContainer>
  );
};

const InputContainer = styled.input`
  border: 0.1rem solid ${({ theme }) => theme.color.primary100};
  border-radius: 0.2rem;
  width: 8rem;
  height: 1.6rem;
  &::placeholder {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color.gray200};
  }
`;

export default Input;
