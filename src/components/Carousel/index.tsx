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

import NavigationButton from './NavigationButton';

interface CarouselProps extends DefaultPropsWithChildren<HTMLDivElement> {
  itemList: { img?: string; content?: string }[];
  cardSize?: CarouselSlideSizeVariant;
  cardWidth?: number;
  cardHeight?: number;
}

interface CarouselContextInterface {
  cardSize: CarouselSlideSizeVariant;
  WIDTH: number;
  HEIGHT: number;
  GAP: number;
}

const CarouselContext = createContext<CarouselContextInterface | null>(null);

const Carousel = ({
  cardSize = 'inline',
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
      cardSize === 'grid' ? CAROUSEL_SLIDE.grid : CAROUSEL_SLIDE.inline;
    if (cardWidth && cardHeight)
      return { ...defaultSize, WIDTH: cardWidth, HEIGHT: cardHeight };
    if (cardHeight) return { ...defaultSize, HEIGHT: cardHeight };
    if (cardWidth) return { ...defaultSize, WIDTH: cardWidth };
    return { ...defaultSize };
  };

  const { WIDTH, GAP, HEIGHT } = getCardSize();
  const totalSlide =
    cardSize === 'grid' ? Math.ceil(totalChildren / 2) : totalChildren;

  const contextValues = {
    cardSize,
    WIDTH,
    HEIGHT,
    GAP,
  };

  const isLastSlide = (currentLeft: number) => {
    return window.innerWidth + currentLeft === (WIDTH + GAP) * totalSlide + 68;
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
    setTotalPage(total < 0 ? 0 : total);
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
          <NavigationButton
            clickHandler={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            {'〈'}
          </NavigationButton>
          {cardSize === 'inline' ? (
            <ItemList ref={scrollRef} onScroll={() => scrollEventHandler()}>
              {children}
            </ItemList>
          ) : (
            <ItemList ref={scrollRef} onScroll={() => scrollEventHandler()}>
              <GridLayout {...{ HEIGHT }}>{children}</GridLayout>
            </ItemList>
          )}
          <NavigationButton
            clickHandler={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPage - 1 || totalPage === 0}
          >
            {'〉'}
          </NavigationButton>
        </Slider>
        {cardSize === 'inline' && (
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

const GridLayout = styled.div<Pick<CarouselContextInterface, 'HEIGHT'>>`
  display: flex;
  flex-flow: column wrap;
  height: ${({ HEIGHT }) => pixelToRem(`${HEIGHT * 2 + 20}px`)};
  justify-content: space-between;
`;

const ItemView = styled.div<Omit<CarouselContextInterface, 'cardSize'>>`
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
  p,
  div,
  span {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
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
