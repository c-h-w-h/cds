import Center from '@components-layout/Center';
import Container from '@components-layout/Container';
import { CAROUSEL_SLIDE_STYLE } from '@constants/carouselSlide';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';
import { DefaultPropsWithChildren } from '@utils/types/DefaultPropsWithChildren';
import { debounce, throttle } from 'lodash';
import {
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
  Children,
} from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import NavigationButton from './NavigationButton';

interface CarouselProps extends DefaultPropsWithChildren<HTMLDivElement> {
  line: number;
  width?: number | undefined;
  height?: number | undefined;
}

interface CarouselContextInterface {
  line: number;
  WIDTH: number;
  HEIGHT: number;
  GAP: number;
  START: number;
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
  if (height) {
    newCardSize.HEIGHT = height;
  }
  if (width) {
    newCardSize.WIDTH = width;
  }
  if (isSmallViewPort(newCardSize.WIDTH)) {
    newCardSize.GAP = window.innerWidth - newCardSize.WIDTH;
    return { ...newCardSize, START: newCardSize.GAP / 2 };
  }
  return {
    ...newCardSize,
    START: newCardSize.GAP + Math.floor(newCardSize.WIDTH / 5),
  };
};

const Carousel = ({ line = 1, children, width, height }: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const totalChildren = Children.count(children);

  const { WIDTH, GAP, HEIGHT, START } = getCardSize({
    line,
    height,
    width: width ? width : cardsRef.current?.children[currentPage].clientWidth,
  });
  const totalSlide = Math.ceil(totalChildren / line);

  const contextValues = {
    line,
    WIDTH,
    HEIGHT,
    GAP,
    START,
  };

  const scrollToPage = (current: number) => {
    throttle(() => {
      current < 0 ? (current = 0) : current;
      current >= totalSlide ? (current = totalSlide - 1) : current;
      setCurrentPage(current);
    }, 200);
    setTimeout(() => {
      cardsRef.current?.children[current * line].scrollIntoView({
        inline: 'start',
        behavior: 'smooth',
      });
    }, 10);
  };

  const scrollEventHandler = debounce(() => {
    const currentLeft = scrollRef.current ? scrollRef.current.scrollLeft : 0;
    setCurrentPage(Math.floor(currentLeft / (WIDTH + GAP)));
  }, 200);

  const initPageHandler = debounce(() => {
    setCurrentPage(0);
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
                <DummySlide WIDTH={sliderWidth} />
              </InlineLayout>
            ) : (
              <GridLayout {...{ HEIGHT, line }} ref={cardsRef}>
                {children}
                <DummySlide
                  WIDTH={
                    totalChildren % line === 0
                      ? sliderWidth - WIDTH + GAP
                      : sliderWidth + GAP
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
            <Progress isSlide={WIDTH === window.innerWidth}>
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
  const context = useContext(CarouselContext);
  if (!context) return <></>;
  const { WIDTH, GAP, HEIGHT, START } = context;
  return (
    <CardView {...{ WIDTH, GAP, HEIGHT, START }}>
      <div style={{ transform: `translateX(${START}px)`, width: '100%' }}>
        {children}
      </div>
    </CardView>
  );
};
const Slide = ({ children }: DefaultPropsWithChildren<HTMLDivElement>) => {
  const context = useContext(CarouselContext);
  if (!context) return <></>;
  const { HEIGHT } = context;
  return <SlideView {...{ HEIGHT }}>{children}</SlideView>;
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
  Pick<CarouselContextInterface, 'HEIGHT' | 'line'>
>`
  display: flex;
  flex-flow: column wrap;
  height: ${({ HEIGHT, line }) => pixelToRem(`${(HEIGHT + 10) * line}px`)};
  justify-content: flex-start;
  div {
    margin-bottom: ${pixelToRem('10px')};
  }
`;

const DummySlide = styled.div<{ WIDTH: number }>`
  width: ${({ WIDTH }) => pixelToRem(`${WIDTH}px`)};
  height: 20px;
`;

const CardView = styled.div<Omit<CarouselContextInterface, 'line'>>`
  display: flex;
  flex-direction: column;
  width: ${({ WIDTH }) => pixelToRem(`${WIDTH}px`)};
  height: ${({ HEIGHT }) => pixelToRem(`${HEIGHT}px`)};
  margin-right: ${({ GAP }) => pixelToRem(`${GAP}px`)};
  background-color: ${({ theme }) => theme.color.white};
  scroll-snap-align: start;
  img {
    width: 100%;
    height: ${({ WIDTH }) => pixelToRem(`${WIDTH}px`)};
    border: 1px solid ${({ theme }) => theme.color.gray100};
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;

const SlideView = styled.div<Pick<CarouselContextInterface, 'HEIGHT'>>`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: ${({ HEIGHT }) => pixelToRem(`${HEIGHT}px`)};
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
    current ? theme.color.primary100 : theme.color.gray100};
  border-radius: 100%;
  height: ${pixelToRem('8px')};
  width: ${pixelToRem('8px')};
`;

Carousel.Card = Card;
Carousel.Slide = Slide;

export default Carousel;
