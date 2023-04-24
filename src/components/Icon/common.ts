import { css } from '@emotion/react';
import { CSSProperties } from 'react';

export interface IconProps {
  size?: CSSProperties['width'];
  color?: CSSProperties['color'];
}

export const scaledSizeStyle = (
  from: CSSProperties['width'],
  to: CSSProperties['width'],
) => {
  return css`
    transform: scale(calc(${to} / ${from}));
  `;
};
