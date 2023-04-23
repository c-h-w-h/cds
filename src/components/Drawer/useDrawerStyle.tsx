import { css, keyframes } from '@emotion/react';
import { CSSProperties } from 'react';

import type { DrawerPosition } from '.';

const useDrawerStyle = (
  position: DrawerPosition,
  backgroundColor: CSSProperties['backgroundColor'],
  isFixed: boolean,
) => {
  const slideIn = keyframes`
      from {
        transform: ${TRANSLATE[position]};
      }
  
      to {
        transform: translateX(0) translateY(0);
      }
    `;

  const slideOut = keyframes`
      from {
        transform: translateX(0) translateY(0);
      }
  
      to {
        transform: ${TRANSLATE[position]};
      }
  `;

  const drawerStyle = css`
    position: ${isFixed ? 'fixed' : 'absolute'};
    ${STYLE[position]}
    transform: ${TRANSLATE[position]};
    background-color: ${backgroundColor};

    &.open {
      animation: ${slideIn} 0.5s;
      transform: translateX(0) translateY(0);
    }

    &.close {
      animation: ${slideOut} 0.5s;
      transform: ${TRANSLATE[position]};
    }
  `;

  return { drawerStyle };
};

export default useDrawerStyle;

const STYLE: Record<DrawerPosition, string> = {
  bottom: 'bottom: 0; left: 0; width: 100%;',
  left: 'top: 0; left: 0; height: 100%;',
};

const TRANSLATE: Record<DrawerPosition, CSSProperties['transform']> = {
  bottom: 'translateY(100%)',
  left: 'translateX(-100%)',
};
