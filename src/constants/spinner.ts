export enum SpinnerSizeVariant {
  SMALL = 'small',
  LARGE = 'large',
}

export interface SpinDesignVariant {
  OUTCIRCLE: string;
  INNERCIRCLE: string;
  SROKEWIDTH: string;
}

export const SPINNER_SIZE: Record<SpinnerSizeVariant, SpinDesignVariant> = {
  [SpinnerSizeVariant.SMALL]: {
    OUTCIRCLE: '1.875rem',
    INNERCIRCLE: '0.938rem',
    SROKEWIDTH: '0.125rem',
  },
  [SpinnerSizeVariant.LARGE]: {
    OUTCIRCLE: '3.125rem',
    INNERCIRCLE: '1.563rem',
    SROKEWIDTH: '0.188rem',
  },
};
