import { CSSProperties } from 'react';

export interface FlexContainerProps {
  direction?: CSSProperties['flexDirection'];
  wrap?: CSSProperties['flexWrap'];
  alignContent?: CSSProperties['alignContent'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];
}
