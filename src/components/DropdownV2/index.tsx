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
}

interface IDropdownContext {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  collapseOnBlur?: boolean;
}
const DropdownContext = createContext<IDropdownContext>({});

const DropdownV2 = ({ collapseOnBlur = false, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, collapseOnBlur }}>
      {children}
    </DropdownContext.Provider>
  );
};

const Trigger = ({ children }: DefaultProps<HTMLDivElement>) => {
  const { isOpen, setIsOpen } = useContext(DropdownContext);
  return (
    <>
      {setIsOpen && (
        <div
          onClick={(e: ReactMouseEvent) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

const Menu = ({ children }: DefaultProps<HTMLDivElement>) => {
  const { isOpen, setIsOpen, collapseOnBlur } = useContext(DropdownContext);
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

  return <>{isOpen && <div ref={menuRef}>{children}</div>}</>;
};

DropdownV2.Trigger = Trigger;
DropdownV2.Menu = Menu;

export default DropdownV2;
export { DropdownContext };
