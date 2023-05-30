import { ColorSet } from '@constants/color';
import { css } from '@emotion/react';
import { CSSProperties } from '@utils';

export const dimmerStyle = (
  position: CSSProperties['position'],
  { black }: ColorSet,
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
