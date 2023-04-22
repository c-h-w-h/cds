import Portal from '@components-common/Portal';
import { ENTER, SPACE } from '@constants/key';
import { DRAWER_PORTAL_ROOT_ID } from '@constants/portal';
import { css, useTheme } from '@emotion/react';
import { ChildProps, ChildrenProps, SetState } from '@utils';
import {
  KeyboardEventHandler,
  cloneElement,
  createContext,
  useState,
} from 'react';
import useSafeContext from 'src/hooks/useSafeContext';

import useDrawerStyle from './useDrawerStyle';

export type DrawerPosition = 'bottom' | 'left';

type DrawerProps = {
  label: string;
  position?: DrawerPosition;
} & ChildrenProps;

interface DrawerContextInterface {
  label: string;
  position: DrawerPosition;
  isOpen: boolean | null;
  setIsOpen: SetState<boolean | null>;
}
const DrawerContext = createContext<DrawerContextInterface | null>(null);

const Drawer = ({ label, position = 'bottom', children }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const providerValue = { label, position, isOpen, setIsOpen };

  return (
    <DrawerContext.Provider value={providerValue}>
      {children}
    </DrawerContext.Provider>
  );
};

const Trigger = ({ children }: ChildProps) => {
  const { label, isOpen, setIsOpen } = useSafeContext(DrawerContext);

  const onKeyDown: KeyboardEventHandler = (e) => {
    if ([SPACE, ENTER].includes(e.key)) setIsOpen(true);
  };

  return cloneElement(children, {
    'aria-haspopup': 'true',
    'aria-expanded': !!isOpen,
    'aria-controls': `${label}-drawer`,
    'aria-label': `${label} 서랍을 여는 트리거`,
    onClick: () => setIsOpen(true),
    onKeyDown,
    style: {
      cursor: 'pointer',
    },
  });
};

const Panel = ({ children }: ChildrenProps) => {
  const { label, position, isOpen, setIsOpen } = useSafeContext(DrawerContext);

  // TODO: close with Esc key

  const { color } = useTheme();
  const { black, offwhite } = color;

  const { drawerStyle } = useDrawerStyle(position, offwhite);
  const dimmerStyle = css`
    ${isOpen ? '' : 'display: none;'}
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    background-color: ${black};
    opacity: 20%;
  `;

  const portalStyle = css`
    position: relative;
    visibility: ${isOpen ? 'visible' : 'hidden'};
  `;

  return (
    <Portal id={DRAWER_PORTAL_ROOT_ID} style={portalStyle}>
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
      >
        {children}
      </aside>
    </Portal>
  );
};

Drawer.Trigger = Trigger;
Drawer.Panel = Panel;

export default Drawer;
