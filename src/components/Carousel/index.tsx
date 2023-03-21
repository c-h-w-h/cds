import Center from '@components-layout/Center';
import { CAROUSEL_SLIDE } from '@constants/carouselSlide';
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
}

const CarouselContext = createContext<CarouselContextInterface | null>(null);

const Carousel = ({
  line = 1,
  children,
  cardWidth,
  cardHeight,
}: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const totalChildren = Children.count(children);

  const getCardSize = () => {
    const defaultSize =
      line === 1 ? CAROUSEL_SLIDE.inline : CAROUSEL_SLIDE.multiline;
    if (cardWidth && cardHeight)
      return { ...defaultSize, WIDTH: cardWidth, HEIGHT: cardHeight };
    if (cardHeight) return { ...defaultSize, HEIGHT: cardHeight };
    if (cardWidth) return { ...defaultSize, WIDTH: cardWidth };
    return { ...defaultSize };
  };

  const { WIDTH, GAP, HEIGHT } = getCardSize();
  const totalSlide =
    line === 1 ? totalChildren : Math.ceil(totalChildren / line);

  const contextValues = {
    line,
    WIDTH,
    HEIGHT,
    GAP,
  };

  const isLastSlide = (currentLeft: number) => {
    const sliderWidth = scrollRef.current ? scrollRef.current.offsetWidth : 0;
    return currentLeft === (WIDTH + GAP) * totalSlide - sliderWidth;
  };

  const scrollEventHandler = debounce(() => {
    const currentLeft = scrollRef.current ? scrollRef.current.scrollLeft : 0;
    if (isLastSlide(currentLeft)) {
      setCurrentPage(totalPage - 1);
      return;
    }
    setCurrentPage(Math.floor(currentLeft / (WIDTH + GAP)));
  }, 200);

  const initPageHandler = debounce(() => {
    const sliderWidth = scrollRef.current ? scrollRef.current.offsetWidth : 0;
    const total = totalSlide - Math.floor(sliderWidth / (WIDTH + GAP)) + 1;
    setTotalPage(total <= 0 ? 1 : total);
    setCurrentPage(0);
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
      <CarouselWrapper>
        <Slider>
          {line === 1 ? (
            <ItemList ref={scrollRef} onScroll={() => scrollEventHandler()}>
              {children}
            </ItemList>
          ) : (
            <ItemList ref={scrollRef} onScroll={() => scrollEventHandler()}>
              <GridLayout {...{ HEIGHT, line }}>{children}</GridLayout>
            </ItemList>
          )}
          <NavigationContainer>
            <NavigationButton
              clickHandler={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <MdArrowBackIosNew />
            </NavigationButton>
            <NavigationButton
              clickHandler={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPage - 1 || totalPage === 0}
            >
              <MdArrowForwardIos />
            </NavigationButton>
          </NavigationContainer>
        </Slider>
        {line === 1 && (
          <Center>
            {Array.from({ length: totalPage }).map((item, index) => (
              <Dot
                key={`${JSON.stringify(item)}+${index}`}
                current={index === currentPage}
              />
            ))}
          </Center>
        )}
      </CarouselWrapper>
    </CarouselContext.Provider>
  );
};

const Card = ({ children }: DefaultPropsWithChildren<HTMLDivElement>) => {
  const context = useContext(CarouselContext);
  if (!context) return <></>;
  const { WIDTH, GAP, HEIGHT } = context;
  return (
    <Item>
      <ItemView {...{ WIDTH, GAP, HEIGHT }}>{children}</ItemView>
    </Item>
  );
};

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Slider = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  margin: 0 ${pixelToRem('10px')};
`;

const ItemList = styled.div`
  overflow-x: scroll;
  width: 100%;
  vertical-align: top;
  display: inline-flex;
  padding: ${pixelToRem('20px')} 0;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  display: inline-block;
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
  transform: translateX(${pixelToRem('10px')});
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
