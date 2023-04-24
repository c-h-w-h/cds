import { css, useTheme } from '@emotion/react';
import { CSSProperties } from 'react';

interface HighlightProps {
  children: string;
  color?: CSSProperties['color'];
}

const Highlight = ({ children, color }: HighlightProps) => {
  const { color: themeColor } = useTheme();
  const { primary } = themeColor;

  const highlightStyle = css`
    color: ${color ?? primary};
  `;

  return <span css={highlightStyle}>{children}</span>;
};

export default Highlight;
