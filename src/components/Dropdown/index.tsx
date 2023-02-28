import Flexbox from '@components/@layout/Flexbox';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { DefaultProps } from '@utils/types/DefaultProps';
import { DefaultPropsWithChildren } from '@utils/types/DefaultPropsWithChildren';
import React, { MouseEvent, MouseEventHandler, ReactNode, useRef } from 'react';
import { IconType } from 'react-icons/lib';

type DropdownAlign = 'left' | 'right' | 'center';

interface DropdownProps extends DefaultPropsWithChildren<HTMLDivElement> {
  toggleElement: ReactNode;
  align?: DropdownAlign;
}

const Dropdown = ({
  children,
  toggleElement,
  align = 'left',
}: DropdownProps) => {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const closeDropdown = (e: MouseEvent) => {
    const { target } = e;
    if (!target || !detailsRef.current) return;
    detailsRef.current.open = false;
  };

  return (
    <DropdownWrapper ref={detailsRef}>
      <summary>{toggleElement}</summary>
      <DropdownList onClick={closeDropdown} align={align}>
        {children}
      </DropdownList>
    </DropdownWrapper>
  );
};

interface DropdownItemProps extends DefaultProps<HTMLLIElement> {
  title?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  description?: string;
  onClick?: MouseEventHandler;
}

const DropdownItem = ({
  title = '',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  description = '',
  onClick: clickEventHandler,
}: DropdownItemProps) => {
  return (
    <DropdownListItem onClick={clickEventHandler}>
      {LeftIcon && (
        <Flexbox alignItems="center">
          <LeftIcon size={'1.2rem'} />
        </Flexbox>
      )}
      <Flexbox
        flexDirection="column"
        gap=".3rem"
        alignItems="center"
        css={css`
          flex: 1;
          text-align: left;
        `}
      >
        {title && <ItemTitle>{title}</ItemTitle>}
        {description && <ItemDescription>{description}</ItemDescription>}
      </Flexbox>
      {RightIcon && (
        <Flexbox alignItems="center">
          <RightIcon size={'1.2rem'} />
        </Flexbox>
      )}
    </DropdownListItem>
  );
};

const DropdownCustomItem = styled.li<DefaultProps<HTMLLIElement>>(() => {
  return {
    cursor: 'pointer',
  };
});

export { Dropdown, DropdownItem, DropdownCustomItem };

const DropdownWrapper = styled.details`
  width: fit-content;
  position: relative;

  & > summary {
    cursor: pointer;
    &::marker {
      content: '';
    }
  }

  &[open] > summary::before {
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 998;
    display: block;
    content: ' ';
    cursor: default;
  }
`;

interface ListProps {
  align: DropdownAlign;
}

const DropdownList = styled.ul<ListProps>`
  ${({ align }) => (align === 'right' ? 'right' : 'left')}: 0;
  position: absolute;
  ${({ align }) =>
    align === 'center' && 'left: 50%; transform: translateX(-50%);'}
  z-index: 999;
  width: fit-content;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.25);
  border-radius: 0.2rem;

  & > li:not(:first-of-type) {
    border-top: 1px solid #ccc;
  }

  & > li:first-of-type {
    border-radius: 0.2rem 0.2rem 0 0;
  }

  & > li:last-of-type {
    border-radius: 0 0 0.2rem 0.2rem;
  }
`;

const DropdownListItem = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  padding: 0.5rem 0.6rem;
  gap: 1rem;

  &:hover {
    filter: brightness(0.95);
  }
`;

const ItemTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  width: 100%;
`;

const ItemDescription = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  width: 100%;
`;
