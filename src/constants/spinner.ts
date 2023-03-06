interface SpinnerStyle {
  OUTCIRCLE: string;
  INNERCIRCLE: string;
  STROKEWIDTH: string;
}

export const SPINNER_STYLE: Record<SpinnerSizeVariant, SpinnerStyle> = {
  small: {
    OUTCIRCLE: '1.875rem',
    INNERCIRCLE: '0.938rem',
    STROKEWIDTH: '0.125rem',
  },
  large: {
    OUTCIRCLE: '3.125rem',
    INNERCIRCLE: '1.563rem',
    STROKEWIDTH: '0.188rem',
  },
};
