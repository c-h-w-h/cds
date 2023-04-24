import Container from '@components-layout/Container';
import { ENTER, SPACE } from '@constants/key';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChildProps } from '@util-types/ChildProps';
import { ChildrenProps } from '@util-types/ChildrenProps';
import {
  cloneElement,
  createContext,
  Dispatch,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent as ReactMouseEvent,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import useSafeContext from 'src/hooks/useSafeContext';

type DropdownProps = {
  label: string;
  collapseOnBlur?: boolean;
  direction?: 'left' | 'right' | 'top' | 'bottom';
} & ChildrenProps;

interface DropdownContextInterface {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  collapseOnBlur: boolean;
  label: string;
  direction: 'left' | 'right' | 'top' | 'bottom';
  triggerSize: {
    width: number;
    height: number;
  };
  setTriggerSize: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >;
}
const DropdownContext = createContext<DropdownContextInterface | null>(null);

const Dropdown = ({
  label,
  collapseOnBlur = false,
  direction = 'bottom',
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [triggerSize, setTriggerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const contextValues = {
    isOpen,
    setIsOpen,
    collapseOnBlur,
    label,
    direction,
    triggerSize,
    setTriggerSize,
  };

  return (
    <DropdownContext.Provider value={contextValues}>
      <Container
        css={css`
          width: 100%;
          height: auto;
          position: relative;
          overflow: visible;
        `}
      >
        {children}
      </Container>
    </DropdownContext.Provider>
  );
};

const Trigger = ({ children }: ChildProps) => {
  const { isOpen, setIsOpen, label, setTriggerSize } =
    useSafeContext(DropdownContext);

  useEffect(() => {
    const $trigger = document.getElementById(`${label}-trigger`);
    if (!$trigger) return;
    setTriggerSize({
      width: $trigger.offsetWidth,
      height: $trigger.offsetHeight,
    });
  }, []);

  const onClick: MouseEventHandler = (e: ReactMouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const onKeyDown: KeyboardEventHandler = (e: KeyboardEvent) => {
    if (children.props.onKeyDown) {
      children.props.onKeyDown(e);
    }

    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return cloneElement(children, {
    onClick,
    onKeyDown,
    'aria-expanded': isOpen,
    'aria-haspopup': 'true',
    'aria-label': `Dropdown Trigger of ${label}`,
    'aria-controls': `${label}-dropdown`,
    tabIndex: 0,
    id: `${label}-trigger`,
  });
};

const Menu = ({ children }: ChildrenProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { isOpen, setIsOpen, collapseOnBlur, label, direction, triggerSize } =
    useSafeContext(DropdownContext);

  const toggleEventHandler = (e: MouseEvent) => {
    if (!isOpen) return;

    const { target } = e;
    if (!target || !menuRef.current) return;

    if (!menuRef.current.contains(target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (collapseOnBlur) {
      document.addEventListener('click', toggleEventHandler);
    }

    return () => {
      if (collapseOnBlur) {
        document.removeEventListener('click', toggleEventHandler);
      }
    };
  }, [isOpen]);

  return (
    <MenuWrapper
      ref={menuRef}
      aria-labelledby={`${label}-trigger`}
      id={`${label}-dropdown`}
      direction={direction ?? 'bottom'}
      triggerSize={triggerSize ?? { width: 0, height: 0 }}
      css={css`
        display: ${isOpen ? 'flex' : 'none'};
      `}
    >
      {children}
    </MenuWrapper>
  );
};

interface MenuWrapperProps {
  direction: 'left' | 'right' | 'top' | 'bottom';
  triggerSize: { width: number; height: number };
}

const MenuWrapper = styled.div<MenuWrapperProps>`
  position: absolute;
  ${({ direction, triggerSize }) => {
    switch (direction) {
      case 'top':
        return `bottom: ${triggerSize.height}px; left:0;`;
      case 'right':
        return `left: ${triggerSize.width}px; top:0;`;
      case 'left':
        return `right: ${triggerSize.width}px; top:0;`;
      default:
        return `top: ${triggerSize.height}px; left:0;`;
    }
  }}
  width: 100%;
  z-index: 1;
`;

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;

export default Dropdown;
export { DropdownContext };
