import Center from '@components-layout/Center';
import Container from '@components-layout/Container';
import { CAROUSEL_SLIDE_STYLE } from '@constants/carouselSlide';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixel-to-rem';
import { DefaultPropsWithChildren } from '@utils/types/DefaultPropsWithChildren';
import { debounce, throttle } from 'lodash';
import { useState, useRef, useEffect, createContext, Children } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import useSafeContext from 'src/hooks/useSafeContext';

import NavigationButton from './NavigationButton';

interface CarouselProps extends DefaultPropsWithChildren<HTMLDivElement> {
  line: number;
  width?: number | undefined;
  height?: number | undefined;
}

interface CarouselContextInterface {
  line: number;
  cardWidth: number;
  cardHeight: number;
  gap: number;
  translateX: number;
}

const CarouselContext = createContext<CarouselContextInterface | null>(null);

const isSmallViewPort = (cardWidth: number) => {
  return window.innerWidth / cardWidth <= 1.2;
};

const getCardSize = ({
  line,
  height,
  width,
}: Omit<CarouselProps, 'children'>) => {
  const cardSize = CAROUSEL_SLIDE_STYLE[line === 1 ? 'inline' : 'multiline'];
  const newCardSize = { ...cardSize };
  height && (newCardSize.cardHeight = height);
  width && (newCardSize.cardWidth = width);
  if (isSmallViewPort(newCardSize.cardWidth)) {
    newCardSize.gap = window.innerWidth - newCardSize.cardWidth;
    return { ...newCardSize, translateX: newCardSize.gap / 2 };
  }
  return {
    ...newCardSize,
    translateX: newCardSize.gap + Math.floor(newCardSize.cardWidth / 5),
  };
};

const Carousel = ({ line = 1, children, width, height }: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const totalChildren = Children.count(children);

  const { cardWidth, gap, cardHeight, translateX } = getCardSize({
    line,
    height,
    width: width ? width : cardsRef.current?.children[currentPage].clientWidth,
  });
  const totalSlide = Math.ceil(totalChildren / line);

  const contextValues = {
    line,
    cardWidth,
    cardHeight,
    gap,
    translateX,
  };

  const scrollToPage = throttle((current: number) => {
    setTimeout(() => {
      cardsRef.current?.children[current * line].scrollIntoView({
        inline: 'start',
        behavior: 'smooth',
      });
    });
  }, 500);

  const scrollEventHandler = debounce(() => {
    const currentLeft = scrollRef.current ? scrollRef.current.scrollLeft : 0;
    setCurrentPage(Math.floor(currentLeft / (cardWidth + gap)));
  }, 200);

  const initPageHandler = debounce(() => {
    scrollToPage(0);
    setSliderWidth(scrollRef.current ? scrollRef.current.offsetWidth : 0);
  }, 200);

  useEffect(() => {
    initPageHandler();
    window.addEventListener('resize', initPageHandler);
    return () => {
      window.removeEventListener('resize', initPageHandler);
    };
  }, []);
  return (
    <CarouselContext.Provider value={contextValues}>
      <Container css={{ display: 'flex', flexDirection: 'column' }}>
        <Container
          css={{
            position: 'relative',
            display: 'flex',
          }}
        >
          <ItemList ref={scrollRef} onScroll={scrollEventHandler}>
            {line === 1 ? (
              <InlineLayout ref={cardsRef}>
                {children}
                <DummySlide cardWidth={sliderWidth} />
              </InlineLayout>
            ) : (
              <GridLayout {...{ cardHeight, line }} ref={cardsRef}>
                {children}
                <DummySlide
                  cardWidth={
                    totalChildren % line === 0
                      ? sliderWidth - cardWidth + gap
                      : sliderWidth + gap
                  }
                />
              </GridLayout>
            )}
          </ItemList>
          <NavigationContainer>
            <NavigationButton
              onClick={() => scrollToPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <MdArrowBackIosNew />
            </NavigationButton>
            <NavigationButton
              onClick={() => scrollToPage(currentPage + 1)}
              disabled={currentPage === totalSlide - 1 || totalSlide === 0}
            >
              <MdArrowForwardIos />
            </NavigationButton>
          </NavigationContainer>
        </Container>
        {line === 1 && (
          <Center>
            <Progress isSlide={cardWidth === window.innerWidth}>
              {Array.from({ length: totalSlide }).map((item, index) => (
                <Dot
                  key={`${JSON.stringify(item)}+${index}`}
                  current={index === currentPage}
                />
              ))}
            </Progress>
          </Center>
        )}
      </Container>
    </CarouselContext.Provider>
  );
};

const Card = ({ children }: DefaultPropsWithChildren<HTMLDivElement>) => {
  const { cardWidth, gap, cardHeight, translateX } =
    useSafeContext(CarouselContext);
  return (
    <CardView {...{ cardWidth, gap, cardHeight, translateX }}>
      <div style={{ transform: `translateX(${translateX}px)`, width: '100%' }}>
        {children}
      </div>
    </CardView>
  );
};
const Slide = ({ children }: DefaultPropsWithChildren<HTMLDivElement>) => {
  const { cardHeight } = useSafeContext(CarouselContext);
  return <SlideView {...{ cardHeight }}>{children}</SlideView>;
};

const ItemList = styled.div`
  overflow-x: scroll;
  vertical-align: top;
  width: 100%;
  display: inline-flex;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const InlineLayout = styled.div`
  display: flex;
  padding-bottom: ${pixelToRem('20px')};
`;

const GridLayout = styled.div<
  Pick<CarouselContextInterface, 'cardHeight' | 'line'>
>`
  display: flex;
  flex-flow: column wrap;
  height: ${({ cardHeight, line }) =>
    pixelToRem(`${(cardHeight + 10) * line}px`)};
  justify-content: flex-start;
  div {
    margin-bottom: ${pixelToRem('10px')};
  }
`;

const DummySlide = styled.div<{ cardWidth: number }>`
  width: ${({ cardWidth }) => pixelToRem(`${cardWidth}px`)};
  height: 20px;
`;

const CardView = styled.div<Omit<CarouselContextInterface, 'line'>>`
  display: flex;
  flex-direction: column;
  width: ${({ cardWidth }) => pixelToRem(`${cardWidth}px`)};
  height: ${({ cardHeight }) => pixelToRem(`${cardHeight}px`)};
  margin-right: ${({ gap }) => pixelToRem(`${gap}px`)};
  background-color: ${({ theme }) => theme.color.white};
  scroll-snap-align: start;
  img {
    width: 100%;
    height: ${({ cardWidth }) => pixelToRem(`${cardWidth}px`)};
    border: 1px solid ${({ theme }) => theme.color.gray100};
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;

const SlideView = styled.div<Pick<CarouselContextInterface, 'cardHeight'>>`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: ${({ cardHeight }) => pixelToRem(`${cardHeight}px`)};
  background-color: ${({ theme }) => theme.color.white};
  overflow: hidden;
  scroll-snap-align: start;
  img {
    width: 100%;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.color.gray100};
    overflow: hidden;
  }
`;

const NavigationContainer = styled.div`
  width: 98%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const Progress = styled.div<{ isSlide: boolean }>`
  width: min-content;
  padding: 0 1rem;
  border-radius: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  transform: translateY(${({ isSlide }) => (isSlide ? '-190%' : '0')});
`;

const Dot = styled.div<{ current: boolean }>`
  margin: 0.7rem;
  background: ${({ theme, current }) =>
    current ? theme.color.primary : theme.color.gray100};
  border-radius: 100%;
  height: ${pixelToRem('8px')};
  width: ${pixelToRem('8px')};
`;

Carousel.Card = Card;
Carousel.Slide = Slide;
Card.displayName = 'Carousel.Card';
Slide.displayName = 'Carousel.Slide';

export default Carousel;
