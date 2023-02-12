import { VARIANT, FONT_SIZE, FONT_WEIGHT } from '@constants/typography';
import { css, jsx } from '@emotion/react';

type TypographyVariant = `${VARIANT}`;

interface TypographyProps {
  variant: TypographyVariant;
  children: string;
}

function Typography({ variant, children }: TypographyProps) {
  let typography: string;

  switch (variant) {
    case VARIANT.TITLE1:
      typography = 'h1';
      break;
    case VARIANT.TITLE2:
      typography = 'h2';
      break;
    case VARIANT.SUBTITLE1:
      typography = 'h3';
      break;
    case VARIANT.SUBTITLE2:
      typography = 'h4';
      break;
    default:
      typography = 'p';
  }

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
