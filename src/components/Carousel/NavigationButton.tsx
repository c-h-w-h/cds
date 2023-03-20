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
    <Center>
      <Button onClick={clickHandler} {...{ disabled }}>
        {children}
      </Button>
    </Center>
  );
};

const Button = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 1.3rem;
  line-height: 1.8rem;
  margin: 0 0.5rem;
  font-weight: 600;
  font-size: 1.5rem;
  @media (hover: hover) {
    &:enabled:hover {
      background-color: ${({ theme }) => theme.color.primary100};
      color: ${({ theme }) => theme.color.white};
      opacity: 0.5;
      cursor: pointer;
    }
  }
  &:enabled:active {
    filter: brightness(0.7);
    background-color: ${({ theme }) => theme.color.primary100};
    color: ${({ theme }) => theme.color.white};
  }
  &:disabled {
    opacity: 0;
  }
`;

export default NavigationButton;
