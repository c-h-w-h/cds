import { TYPOGRAPHY } from '@constants/typography';
import { css, jsx } from '@emotion/react';
import { DefaultProps } from '@util-types/DefaultProps';
import { CSSProperties } from 'react';

interface TypographyProps extends DefaultProps<HTMLParagraphElement> {
  children: TextNode;
  variant?: TypographyVariant;
  color?: CSSProperties['color'];
  bold?: boolean;
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

const Typography = ({
  children,
  variant = 'body',
  color,
  bold,
  ...props
}: TypographyProps) => {
  const typography = getTypography(variant);

  return jsx(
    typography,
    {
      css: css`
        margin: 0;
        color: ${color ?? 'inherit'};
        font-size: ${TYPOGRAPHY[variant].size};
        font-weight: ${TYPOGRAPHY[variant].weight + (bold ? 300 : 0)};
      `,
      ...props,
    },
    children,
  );
};

export default Typography;
