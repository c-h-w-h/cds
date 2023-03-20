interface CarouselSlideStyle {
  WIDTH: number;
  HEIGHT: number;
  GAP: number;
}

export const CAROUSEL_SLIDE: Record<
  CarouselSlideSizeVariant,
  CarouselSlideStyle
> = {
  grid: {
    WIDTH: 112,
    HEIGHT: 160,
    GAP: 20,
  },
  inline: {
    WIDTH: 160,
    HEIGHT: 208,
    GAP: 20,
  },
};
