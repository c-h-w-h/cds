import { CSSProperties } from 'react';

interface FlexboxStyleProps {
  flexDirection?: CSSProperties['flexDirection'];
  flexWrap?: CSSProperties['flexWrap'];
  alignContent?: CSSProperties['alignContent'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];
}

export const flexboxStyle = ({
  flexDirection = 'row',
  flexWrap = 'nowrap',
  alignContent = 'normal',
  alignItems = 'center',
  justifyContent = 'center',
  gap = '1rem',
}: FlexboxStyleProps) => {
  return {
    display: 'flex',
    flexDirection,
    flexWrap,
    alignContent,
    alignItems,
    justifyContent,
    gap,
  };
};
