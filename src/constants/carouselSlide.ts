interface CarouselSlideStyle {
  cardWidth: number;
  cardHeight: number;
  gap: number;
}

export const CAROUSEL_SLIDE_STYLE: Record<
  CarouselSlideSizeVariant,
  CarouselSlideStyle
> = {
  multiline: {
    cardWidth: 112,
    cardHeight: 160,
    gap: 20,
  },
  inline: {
    cardWidth: 160,
    cardHeight: 208,
    gap: 20,
  },
};
