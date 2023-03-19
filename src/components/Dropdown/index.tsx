import Container from '@components-layout/Container';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { DefaultProps } from '@util-types/DefaultProps';
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

interface DropdownProps extends DefaultProps<HTMLDivElement> {
  collapseOnBlur: boolean;
  dropdownLabel?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

interface IDropdownContext {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  collapseOnBlur?: boolean;
  dropdownLabel?: string;
  id?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  triggerSize?: {
    width: number;
    height: number;
  };
  setTriggerSize?: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >;
}
const DropdownContext = createContext<IDropdownContext>({});

const Dropdown = ({
  collapseOnBlur = false,
  dropdownLabel = '',
  id,
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

const Trigger = ({ children }: DefaultProps<HTMLDivElement>) => {
  const { isOpen, setIsOpen, dropdownLabel, id, setTriggerSize } =
    useContext(DropdownContext);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!triggerRef.current || !setTriggerSize) return;
    setTriggerSize({
      width: triggerRef.current.offsetWidth,
      height: triggerRef.current.offsetHeight,
    });
  }, [triggerRef.current]);

  return (
    <>
      {setIsOpen && (
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
      )}
    </>
  );
};

const Menu = ({ children }: DefaultProps<HTMLDivElement>) => {
  const { isOpen, setIsOpen, collapseOnBlur, id, direction, triggerSize } =
    useContext(DropdownContext);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleEventHandler = (e: MouseEvent) => {
    if (!isOpen) return;

    const { target } = e;
    if (!target || !menuRef.current || !setIsOpen) return;

    if (!menuRef.current.contains(target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (collapseOnBlur) document.addEventListener('click', toggleEventHandler);

    return () => {
      if (collapseOnBlur)
        document.removeEventListener('click', toggleEventHandler);
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

interface IMenuWrapper {
  direction: 'left' | 'right' | 'top' | 'bottom';
  triggerSize: { width: number; height: number };
}

const MenuWrapper = styled.div<IMenuWrapper>`
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
