import { VARIANT, FONT_SIZE, FONT_WEIGHT } from '@constants/typography';
import { css, jsx } from '@emotion/react';

type TypographyVariant = `${VARIANT}`;

interface TypographyProps {
  variant: TypographyVariant;
  children: string;
}

function getTypography(variant: TypographyVariant): string {
  switch (variant) {
    case VARIANT.TITLE1:
      return 'h1';
    case VARIANT.TITLE2:
      return 'h2';
    case VARIANT.SUBTITLE1:
      return 'h3';
    case VARIANT.SUBTITLE2:
      return 'h4';
    default:
      return 'p';
  }
}

function Typography({ variant, children }: TypographyProps) {
  const typography = getTypography(variant);

  return jsx(
    typography,
    {
      css: css`
        font-size: ${FONT_SIZE[variant]};
        font-weight: ${FONT_WEIGHT[variant]};
      `,
    },
    children,
  );
}

export default Typography;
