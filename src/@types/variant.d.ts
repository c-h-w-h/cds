type ButtonShapeVariant = 'round' | 'square';
type ButtonThemeVariant = 'light';
declare type ButtonVariant =
  | ButtonShapeVariant
  | ButtonThemeVariant
  | `${ButtonShapeVariant} ${ButtonThemeVariant}`;

declare type TypographyVariant =
  | 'title1'
  | 'title2'
  | 'subtitle1'
  | 'subtitle2'
  | 'body'
  | 'desc';

declare type ImageSizeVariant = 'small' | 'medium' | 'large';
declare type ImageShapeVariant = 'circle' | 'rounded';
declare type CarouselSlideSizeVariant = 'multiline' | 'inline';
declare type SpinnerSizeVariant = 'small' | 'large';

declare type SpacingVariant = 5 | 10 | 15 | 20 | 30 | 40 | 60 | 80 | 100;
