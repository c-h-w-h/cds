import {
  TypographyVariant as Variant,
  TYPOGRAPHY,
} from '@constants/typography';
import { css, jsx } from '@emotion/react';

type TypographyVariant = `${Variant}`;
interface TypographyProps {
  variant: TypographyVariant;
  children: string;
}

function getTypography(variant: TypographyVariant): string {
  switch (variant) {
    case Variant.TITLE1:
      return 'h1';
    case Variant.TITLE2:
      return 'h2';
    case Variant.SUBTITLE1:
      return 'h3';
    case Variant.SUBTITLE2:
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
        margin: 0;
        font-size: ${TYPOGRAPHY[variant].size};
        font-weight: ${TYPOGRAPHY[variant].weight};
      `,
    },
    children,
  );
}

export default Typography;
