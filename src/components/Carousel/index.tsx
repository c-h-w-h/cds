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
  line?: number;
  cardWidth?: number;
  cardHeight?: number;
}

interface CarouselContextInterface {
  line: number;
  WIDTH: number;
  HEIGHT: number;
  GAP: number;
  START: number;
}

const CarouselContext = createContext<CarouselContextInterface | null>(null);

const Carousel = ({
  line = 1,
  children,
  cardWidth,
  cardHeight,
}: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const totalChildren = Children.count(children);

  const getCardSize = () => {
    const cardSize =
      line === 1 ? CAROUSEL_SLIDE_STYLE.inline : CAROUSEL_SLIDE_STYLE.multiline;
    if (cardHeight) {
      cardSize.HEIGHT = cardHeight;
    }
    if (cardWidth) {
      cardSize.WIDTH = cardWidth;
    }
    if (window.innerWidth / cardSize.WIDTH <= 1.2) {
      cardSize.GAP = window.innerWidth - cardSize.WIDTH;
      return { ...cardSize, START: cardSize.GAP / 2 };
    }
    return { ...cardSize, START: cardSize.GAP + 60 };
  };

  const { WIDTH, GAP, HEIGHT, START } = getCardSize();
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
    if (currentLeft >= (totalSlide - 1) * (WIDTH + GAP)) {
      setCurrentPage(totalSlide - 1);
      scrollRef.current?.scrollTo((totalSlide - 1) * (WIDTH + GAP), 0);
      return;
    }
    setCurrentPage(Math.floor(currentLeft / (WIDTH + GAP)));
  }, 200);

  const initPageHandler = debounce(() => {
    setCurrentPage(0);
    setSliderWidth(scrollRef.current ? scrollRef.current.offsetWidth : 0);
  }, 200);

  useEffect(() => {
    scrollRef.current?.scrollTo(currentPage * (WIDTH + GAP), 0);
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
              <InlineLayout>
                {children}
                {Array.from({
                  length: Math.floor(sliderWidth / (WIDTH + GAP)),
                }).map((item, index) => (
                  <Card key={`${JSON.stringify(item)}+${index}`}>
                    <div />
                  </Card>
                ))}
              </InlineLayout>
            ) : (
              <GridLayout {...{ HEIGHT, line }}>
                {children}
                {Array.from({
                  length: Math.floor(sliderWidth / (WIDTH + GAP)) * line,
                }).map((item, index) => (
                  <Card key={`${JSON.stringify(item)}+${index}`}>
                    <div />
                  </Card>
                ))}
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
  return <ItemView {...{ WIDTH, GAP, HEIGHT, START }}>{children}</ItemView>;
};

const ItemList = styled.div`
  overflow-x: scroll;
  width: 100%;
  vertical-align: top;
  display: inline-flex;
  padding: ${pixelToRem('20px')} 0;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-snap-align: start;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const InlineLayout = styled.div`
  display: flex;
`;

const GridLayout = styled.div<
  Pick<CarouselContextInterface, 'HEIGHT' | 'line'>
>`
  display: flex;
  flex-flow: column wrap;
  height: ${({ HEIGHT, line }) => pixelToRem(`${(HEIGHT + 20) * line}px`)};
  justify-content: flex-start;
  div {
    margin-bottom: ${pixelToRem('10px')};
  }
`;

const ItemView = styled.div<Omit<CarouselContextInterface, 'line'>>`
  display: flex;
  flex-direction: column;
  width: ${({ WIDTH }) => pixelToRem(`${WIDTH}px`)};
  height: ${({ HEIGHT }) => pixelToRem(`${HEIGHT}px`)};
  margin-right: ${({ GAP }) => pixelToRem(`${GAP}px`)};
  transform: translateX(${({ START }) => pixelToRem(`${START}px`)});
  background-color: ${({ theme }) => theme.color.white};
  img {
    width: 100%;
    height: ${({ WIDTH }) => pixelToRem(`${WIDTH}px`)};
    border: 1px solid ${({ theme }) => theme.color.gray100};
    border-radius: 10px;
    margin-bottom: 10px;
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

export default Carousel;
