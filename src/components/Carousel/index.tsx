import Center from '@components-layout/Center';
import Container from '@components-layout/Container';
import { CAROUSEL_SLIDE_STYLE } from '@constants/carouselSlide';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';
import { DefaultPropsWithChildren } from '@utils/types/DefaultPropsWithChildren';
import { debounce } from 'lodash';
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

const getCardSize = ({
  line,
  height,
  width,
}: Omit<CarouselProps, 'children'>) => {
  const cardSize =
    line === 1 ? CAROUSEL_SLIDE_STYLE.inline : CAROUSEL_SLIDE_STYLE.multiline;
  const newCardSize = { ...cardSize };
  if (height) {
    newCardSize.HEIGHT = height;
  }
  if (width) {
    newCardSize.WIDTH = width;
  }
  if (window.innerWidth / newCardSize.WIDTH <= 1.2) {
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
  const totalSlide =
    line === 1 ? totalChildren : Math.ceil(totalChildren / line);

  const contextValues = {
    line,
    WIDTH,
    HEIGHT,
    GAP,
    START,
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
    cardsRef.current?.children[currentPage * line].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  }, [currentPage]);

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
          <ItemList ref={scrollRef} onScroll={() => scrollEventHandler()}>
            {line === 1 ? (
              <InlineLayout ref={cardsRef}>
                {children}
                <DummySlide WIDTH={sliderWidth - WIDTH}></DummySlide>
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
                ></DummySlide>
              </GridLayout>
            )}
          </ItemList>
          <NavigationContainer>
            <NavigationButton
              clickHandler={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <MdArrowBackIosNew />
            </NavigationButton>
            <NavigationButton
              clickHandler={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalSlide - 1 || totalSlide === 0}
            >
              <MdArrowForwardIos />
            </NavigationButton>
          </NavigationContainer>
        </Container>
        {line === 1 && (
          <Center>
            {Array.from({ length: totalSlide }).map((item, index) => (
              <Dot
                key={`${JSON.stringify(item)}+${index}`}
                current={index === currentPage}
              />
            ))}
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
  return <CardView {...{ WIDTH, GAP, HEIGHT, START }}>{children}</CardView>;
};
const Slide = ({ children }: DefaultPropsWithChildren<HTMLDivElement>) => {
  const context = useContext(CarouselContext);
  if (!context) return <></>;
  const { HEIGHT } = context;
  return <SlideView {...{ HEIGHT }}>{children}</SlideView>;
};

const ItemList = styled.div`
  overflow-x: scroll;
  width: 100%;
  vertical-align: top;
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
  transform: translateX(${({ START }) => pixelToRem(`${START}px`)});
  scroll-margin-left: ${({ START }) => pixelToRem(`${START}px`)};
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
`;

const Dot = styled.div<{ current: boolean }>`
  background: ${({ theme, current }) =>
    current ? theme.color.primary100 : theme.color.gray100};
  border-radius: 100%;
  height: ${pixelToRem('8px')};
  width: ${pixelToRem('8px')};
  transition: all 0.1s;
`;

Carousel.Card = Card;
Carousel.Slide = Slide;

export default Carousel;
