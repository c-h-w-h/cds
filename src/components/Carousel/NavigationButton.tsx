import Center from '@components-layout/Center';
import styled from '@emotion/styled';
import { DefaultPropsWithChildren } from '@util-types/DefaultPropsWithChildren';
import { MouseEventHandler } from 'react';

interface NavButtonProps extends DefaultPropsWithChildren<HTMLDivElement> {
  clickHandler: MouseEventHandler;
  disabled: boolean;
}

const NavigationButton = ({
  clickHandler,
  disabled,
  children,
}: NavButtonProps) => {
  return (
    <Button onClick={clickHandler} {...{ disabled }}>
      <Center>{children}</Center>
    </Button>
  );
};

const Button = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.black};
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 1.3rem;
  @media (hover: hover) {
    &:enabled:hover {
      background-color: ${({ theme }) => theme.color.black};
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }
  &:enabled:active {
    filter: brightness(0.7);
  }
  &:disabled {
    opacity: 0;
  }
`;

export default NavigationButton;
