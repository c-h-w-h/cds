import Portal from '@components-common/Portal';
import { ENTER, ESC, SPACE } from '@constants/key';
import { DRAWER_PORTAL_ROOT_ID } from '@constants/portal';
import { css, useTheme } from '@emotion/react';
import { dimmerStyle as commonDimmerStyle } from '@styles/dimmed';
import { ChildProps, ChildrenProps, SetState } from '@utils';
import {
  KeyboardEventHandler,
  RefObject,
  cloneElement,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import useSafeContext from 'src/hooks/useSafeContext';

import useDrawerStyle from './useDrawerStyle';

export type DrawerPosition = 'bottom' | 'left';

type DrawerProps = {
  label: string;
  position?: DrawerPosition;
  containerId?: string;
} & ChildrenProps;

interface DrawerContextInterface {
  label: string;
  position: DrawerPosition;
  isOpen: boolean | null;
  setIsOpen: SetState<boolean | null>;
  drawerRef: RefObject<HTMLUnknownElement>;
  containerId: string;
}
const DrawerContext = createContext<DrawerContextInterface | null>(null);

const Drawer = ({
  label,
  position = 'left',
  containerId = DRAWER_PORTAL_ROOT_ID,
  children,
}: DrawerProps) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const drawerRef = useRef<HTMLUnknownElement>(null);

  const providerValue = {
    label,
    position,
    isOpen,
    setIsOpen,
    drawerRef,
    containerId,
  };

  return (
    <DrawerContext.Provider value={providerValue}>
      {children}
    </DrawerContext.Provider>
  );
};

const Trigger = ({ children }: ChildProps) => {
  const { label, isOpen, setIsOpen, drawerRef } = useSafeContext(DrawerContext);

  const onOpen = () => {
    const $drawer = drawerRef.current;
    if (!$drawer) return;

    setIsOpen(true);
    $drawer.addEventListener('animationend', () => $drawer.focus(), {
      once: true,
    });
  };

  const onKeyDown: KeyboardEventHandler = (e) => {
    if ([SPACE, ENTER].includes(e.key)) {
      e.preventDefault();
      onOpen();
    }
  };

  return cloneElement(children, {
    'aria-haspopup': 'true',
    'aria-expanded': !!isOpen,
    'aria-controls': `${label}-drawer`,
    'aria-label': `${label} 서랍을 여는 트리거`,
    onClick: onOpen,
    onKeyDown,
    style: {
      cursor: 'pointer',
    },
    tabIndex: isOpen ? -1 : 0,
  });
};

const Panel = ({ children }: ChildrenProps) => {
  const { label, position, isOpen, setIsOpen, drawerRef, containerId } =
    useSafeContext(DrawerContext);

  const onKeyDown = (e: Event) => {
    if (!(e instanceof KeyboardEvent)) return;
    if (e.key === ESC) {
      setIsOpen(false);
      // TODO: Trigger로 포커스 이동
    }
  };
  useEffect(() => {
    const $portal = document.querySelector(`#${containerId}`);
    if (!$portal) return;

    $portal.addEventListener('keydown', onKeyDown);

    return () => {
      $portal.removeEventListener('keydown', onKeyDown);
    };
  });

  const { color } = useTheme();
  const { offWhite } = color;
  const isFixedDrawer = containerId === DRAWER_PORTAL_ROOT_ID;

  const { drawerStyle } = useDrawerStyle(position, offWhite, isFixedDrawer);
  const dimmerStyle = css`
    display: ${isOpen ? 'block' : 'none'};
    ${commonDimmerStyle(isFixedDrawer ? 'fixed' : 'absolute', color)}
    overflow-y: hidden;
  `;

  const portalStyle = isFixedDrawer
    ? undefined
    : css`
        position: relative;
        overflow: hidden;
      `;

  return (
    <Portal id={containerId} style={portalStyle}>
      <div
        css={dimmerStyle}
        aria-hidden={true}
        aria-controls={`${label}-drawer`}
        onClick={() => setIsOpen(false)}
      ></div>
      <aside
        id={`${label}-drawer`}
        css={drawerStyle}
        // eslint-disable-next-line no-nested-ternary
        className={isOpen === null ? 'initial' : isOpen ? 'open' : 'close'}
        aria-hidden={!isOpen}
        ref={drawerRef}
        tabIndex={-1}
      >
        {children}
      </aside>
    </Portal>
  );
};

Drawer.Trigger = Trigger;
Trigger.displayName = 'Drawer.Trigger';
Drawer.Panel = Panel;
Panel.displayName = 'Drawer.Panel';

export default Drawer;
