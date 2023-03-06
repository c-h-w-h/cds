interface Font {
  size: string;
  weight: number;
}

export const TYPOGRAPHY: Record<TypographyVariant, Font> = {
  title1: {
    size: '3rem',
    weight: 900,
  },
  title2: {
    size: '2.25rem',
    weight: 900,
  },
  subtitle1: {
    size: '1.5rem',
    weight: 700,
  },
  subtitle2: {
    size: '1.25rem',
    weight: 700,
  },
  body: {
    size: '1rem',
    weight: 400,
  },
  desc: {
    size: '0.75rem',
    weight: 400,
  },
} as const;
