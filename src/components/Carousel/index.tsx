import Center from '@components-layout/Center';
import { CAROUSEL_SLIDE } from '@constants/carouselSlide';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';
import { debounce } from 'lodash';
import { useState, useRef, useEffect } from 'react';

import LargeCard from './LargeCard';
import NavigationButton from './NavigationButton';
import SmallCard from './SmallCard';

type CarouselProps = {
  itemList: { img?: string; content?: string }[];
  size?: CarouselSlideSizeVariant;
};

const Carousel = ({ itemList, size = 'large' }: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { WIDTH, GAP } =
    size === 'small' ? CAROUSEL_SLIDE.small : CAROUSEL_SLIDE.large;

  const totalSlide =
    size === 'small' ? Math.ceil(itemList.length / 2) : itemList.length;

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
    <CarouselWrapper>
      <Slider>
        <NavigationButton
          clickHandler={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          {'〈'}
        </NavigationButton>
        <ItemList ref={scrollRef} onScroll={() => scrollEventHandler()}>
          {itemList.map((item, index) => (
            <Item key={`${JSON.stringify(item)}+${index}`}>
              {size === 'large' ? (
                <LargeCard {...{ item }} />
              ) : (
                index % 2 === 0 && (
                  <SmallCard
                    firstItem={item}
                    secondItem={itemList.at(index + 1)}
                  />
                )
              )}
            </Item>
          ))}
        </ItemList>
        <NavigationButton
          clickHandler={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPage - 1 || totalPage === 0}
        >
          {'〉'}
        </NavigationButton>
      </Slider>
      {size === 'large' && (
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
  width: min-content;
  scroll-snap-align: start;
`;

const Dot = styled.div<{ current: boolean }>`
  background: ${({ theme, current }) =>
    current ? theme.color.primary100 : theme.color.gray100};
  border-radius: 100%;
  height: ${pixelToRem('8px')};
  width: ${pixelToRem('8px')};
  transition: all 0.1s;
`;

export default Carousel;
