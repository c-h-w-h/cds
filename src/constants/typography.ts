export enum TypographyVariant {
  TITLE1 = 'title1',
  TITLE2 = 'title2',
  SUBTITLE1 = 'subtitle1',
  SUBTITLE2 = 'subtitle2',
  BODY = 'body',
  DESC = 'desc',
}

interface Font {
  size: string;
  weight: number;
}

export const TYPOGRAPHY: Record<TypographyVariant, Font> = {
  [TypographyVariant.TITLE1]: {
    size: '3rem',
    weight: 900,
  },
  [TypographyVariant.TITLE2]: {
    size: '2.25rem',
    weight: 900,
  },
  [TypographyVariant.SUBTITLE1]: {
    size: '1.5rem',
    weight: 700,
  },
  [TypographyVariant.SUBTITLE2]: {
    size: '1.25rem',
    weight: 700,
  },
  [TypographyVariant.BODY]: {
    size: '1rem',
    weight: 400,
  },
  [TypographyVariant.DESC]: {
    size: '0.75rem',
    weight: 400,
  },
} as const;
