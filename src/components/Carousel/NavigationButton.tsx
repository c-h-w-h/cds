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
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 1.5rem;
  @media (hover: hover) {
    &:enabled:hover {
      filter: brightness(0.9);
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
