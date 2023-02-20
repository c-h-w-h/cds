export enum SpinnerSizeVariant {
  SMALL = 'small',
  LARGE = 'large',
}

export interface SpinDesignVariant {
  OUTCIRCLE: string;
  INNERCIRCLE: string;
  STROKEWIDTH: string;
}

export const SPINNER_SIZE: Record<SpinnerSizeVariant, SpinDesignVariant> = {
  [SpinnerSizeVariant.SMALL]: {
    OUTCIRCLE: '1.875rem',
    INNERCIRCLE: '0.938rem',
    STROKEWIDTH: '0.125rem',
  },
  [SpinnerSizeVariant.LARGE]: {
    OUTCIRCLE: '3.125rem',
    INNERCIRCLE: '1.563rem',
    STROKEWIDTH: '0.188rem',
  },
};
