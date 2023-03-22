import Container from '@components-layout/Container';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChildrenProps } from '@util-types/ChildrenProps';
import {
  createContext,
  Dispatch,
  MouseEvent as ReactMouseEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type DropdownProps = {
  id: string;
  dropdownLabel: string;
  collapseOnBlur: boolean;
  direction?: 'left' | 'right' | 'top' | 'bottom';
} & ChildrenProps;

interface DropdownContextInterface {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  collapseOnBlur: boolean;
  dropdownLabel: string;
  id: string;
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
  id = '',
  dropdownLabel = '',
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
    dropdownLabel,
    id,
    direction,
    triggerSize,
    setTriggerSize,
  };

  return (
    <DropdownContext.Provider value={contextValues}>
      <Container
        css={css`
          width: auto;
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

const Trigger = ({ children }: ChildrenProps) => {
  const context = useContext(DropdownContext);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  if (!context) return <></>;

  const { isOpen, setIsOpen, dropdownLabel, id, setTriggerSize } = context;

  useEffect(() => {
    if (!triggerRef.current || !setTriggerSize) return;
    setTriggerSize({
      width: triggerRef.current.offsetWidth,
      height: triggerRef.current.offsetHeight,
    });
  }, [triggerRef.current]);

  return (
    <div
      onClick={(e: ReactMouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label={dropdownLabel}
      id={id}
      ref={triggerRef}
    >
      {children}
    </div>
  );
};

const Menu = ({ children }: ChildrenProps) => {
  const context = useContext(DropdownContext);
  const menuRef = useRef<HTMLDivElement | null>(null);

  if (!context) return <></>;

  const { isOpen, setIsOpen, collapseOnBlur, id, direction, triggerSize } =
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
      aria-labelledby={id}
      direction={direction ?? 'bottom'}
      triggerSize={triggerSize ?? { width: 0, height: 0 }}
    >
      {isOpen && children}
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
`;

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;

export default Dropdown;
export { DropdownContext };
