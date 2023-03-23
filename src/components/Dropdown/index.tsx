import Container from '@components-layout/Container';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChildrenProps } from '@util-types/ChildrenProps';
import {
  cloneElement,
  createContext,
  Dispatch,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent as ReactMouseEvent,
  MouseEventHandler,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

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

const Trigger = ({ children }: { children: ReactElement }) => {
  const context = useContext(DropdownContext);

  if (!context) return <></>;

  const { isOpen, setIsOpen, label, setTriggerSize } = context;

  useEffect(() => {
    const $trigger = document.getElementById(`${label}-Trigger`);
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
    if (e.key === ' ' || e.key === 'Enter') {
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
    'aria-controls': `${label}-Dropdown`,
    tabIndex: 0,
    id: `${label}-Trigger`,
  });
};

const Menu = ({ children }: ChildrenProps) => {
  const context = useContext(DropdownContext);
  const menuRef = useRef<HTMLDivElement | null>(null);

  if (!context) return <></>;

  const { isOpen, setIsOpen, collapseOnBlur, label, direction, triggerSize } =
    context;

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
      aria-labelledby={`${label}-Trigger`}
      id={`${label}-Dropdown`}
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
