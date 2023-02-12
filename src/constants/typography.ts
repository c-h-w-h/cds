export enum VARIANT {
  TITLE1 = 'title1',
  TITLE2 = 'title2',
  SUBTITLE1 = 'subtitle1',
  SUBTITLE2 = 'subtitle2',
  BODY = 'body',
  DESC = 'desc',
}

export const FONT_SIZE: Record<VARIANT, string> = {
  [VARIANT.TITLE1]: '3rem',
  [VARIANT.TITLE2]: '2.25rem',
  [VARIANT.SUBTITLE1]: '1.5rem',
  [VARIANT.SUBTITLE2]: '1.25rem',
  [VARIANT.BODY]: '1rem',
  [VARIANT.DESC]: '0.75rem',
};

export const FONT_WEIGHT: Record<VARIANT, number> = {
  [VARIANT.TITLE1]: 900,
  [VARIANT.TITLE2]: 900,
  [VARIANT.SUBTITLE1]: 700,
  [VARIANT.SUBTITLE2]: 700,
  [VARIANT.BODY]: 400,
  [VARIANT.DESC]: 400,
};
