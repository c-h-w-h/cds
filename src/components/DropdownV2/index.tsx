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
}

interface IDropdownContext {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  collapseOnBlur?: boolean;
  dropdownLabel?: string;
  id?: string;
}
const DropdownContext = createContext<IDropdownContext>({});

const DropdownV2 = ({
  collapseOnBlur = false,
  dropdownLabel = '',
  id,
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, collapseOnBlur, dropdownLabel, id }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

const Trigger = ({ children }: DefaultProps<HTMLDivElement>) => {
  const { isOpen, setIsOpen, dropdownLabel, id } = useContext(DropdownContext);
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
        >
          {children}
        </div>
      )}
    </>
  );
};

const Menu = ({ children }: DefaultProps<HTMLDivElement>) => {
  const { isOpen, setIsOpen, collapseOnBlur, id } = useContext(DropdownContext);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const toggleEventHandler = (e: MouseEvent) => {
      if (!isOpen) return;

      const { target } = e;
      if (
        !target ||
        !(target instanceof Node) ||
        !menuRef.current ||
        !setIsOpen
      )
        return;

      if (!menuRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    if (collapseOnBlur) document.addEventListener('click', toggleEventHandler);

    return () => {
      if (collapseOnBlur)
        document.removeEventListener('click', toggleEventHandler);
    };
  }, [isOpen]);

  return (
    <MenuWrapper ref={menuRef} aria-labelledby={id}>
      {isOpen && children}
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  position: absolute;
`;

DropdownV2.Trigger = Trigger;
DropdownV2.Menu = Menu;

export default DropdownV2;
export { DropdownContext };
