import { TYPOGRAPHY } from '@constants/typography';
import { css, jsx } from '@emotion/react';
import { CSSProperties } from 'react';

interface TypographyProps {
  children: TextNode;
  variant?: TypographyVariant;
  color?: CSSProperties['color'];
}

const getTypography = (variant: TypographyVariant): string => {
  switch (variant) {
    case 'title1':
      return 'h1';
    case 'title2':
      return 'h2';
    case 'subtitle1':
      return 'h3';
    case 'subtitle2':
      return 'h4';
    default:
      return 'p';
  }
};

const Typography = ({ children, variant = 'body', color }: TypographyProps) => {
  const typography = getTypography(variant);

  return jsx(
    typography,
    {
      css: css`
        margin: 0;
        color: ${color ?? 'inherit'};
        font-size: ${TYPOGRAPHY[variant].size};
        font-weight: ${TYPOGRAPHY[variant].weight};
      `,
    },
    children,
  );
};

export default Typography;
