import { Color } from '@constants/color';
import { css } from '@emotion/react';
import { CSSProperties } from 'react';

/**
 * @param {CSSProperties['position']} position
 * @param {Color} {black}
 * @returns {SerializedStyles}
 */
export const dimmerStyle = (
  position: CSSProperties['position'],
  { black }: Color,
) => css`
  position: ${position};
  top: 0;
  left: 0;
  z-index: 998;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-color: ${black};
`;
