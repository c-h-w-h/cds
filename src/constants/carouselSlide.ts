interface CarouselSlideStyle {
  WIDTH: number;
  HEIGHT: number;
  GAP: number;
}

export const CAROUSEL_SLIDE: Record<
  CarouselSlideSizeVariant,
  CarouselSlideStyle
> = {
  small: {
    WIDTH: 112,
    HEIGHT: 208,
    GAP: 20,
  },
  large: {
    WIDTH: 160,
    HEIGHT: 208,
    GAP: 20,
  },
};
