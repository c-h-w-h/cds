export enum ImageSizeVariant {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum ImageShapeVariant {
  CIRCLE = 'circle',
  ROUNDED = 'rounded',
}

export const IMAGE_SIZE: Record<ImageSizeVariant, string> = {
  [ImageSizeVariant.SMALL]: '2rem',
  [ImageSizeVariant.MEDIUM]: '3rem',
  [ImageSizeVariant.LARGE]: '4rem',
} as const;

export const IMAGE_SHAPE: Record<ImageShapeVariant, string> = {
  [ImageShapeVariant.CIRCLE]: '50%',
  [ImageShapeVariant.ROUNDED]: '30px',
};
