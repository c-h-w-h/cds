import Center from '@components-layout/Center';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';
import { debounce } from 'lodash';
import { useState, useRef, useEffect } from 'react';

import LargeCard from './LargeCard';
import NavigationButton from './NavigationButton';
import SmallCard from './SmallCard';

type CarouselProps = {
  itemList: { img?: string; content?: string }[];
  size?: 'small' | 'large';
};

const Carousel = ({ itemList, size = 'large' }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex =
    size === 'small'
      ? Math.floor(itemList.length / 2) - 1
      : itemList.length - 1;
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollEventHandler = debounce(() => {
    const currentLeft = scrollRef.current?.scrollLeft
      ? scrollRef.current?.scrollLeft
      : 0;
    const currentWidth = scrollRef.current?.scrollWidth
      ? scrollRef.current?.scrollWidth
      : 0;
    if (currentWidth - currentLeft < 300) {
      setCurrentIndex(Math.ceil(currentLeft / 180));
    } else {
      setCurrentIndex(Math.floor(currentLeft / 180));
    }
  }, 200);
  useEffect(() => {
    scrollRef.current?.scrollTo(currentIndex * 180, 0);
  }, [currentIndex]);
  return (
    <CarouselWrapper>
      <Slider>
        <NavigationButton
          clickHandler={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
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
          clickHandler={() => setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex === lastIndex}
        >
          {'〉'}
        </NavigationButton>
      </Slider>
      {size === 'large' && (
        <Center>
          {itemList.map((item, index) => (
            <Dot
              key={`${JSON.stringify(item)}+${index}`}
              current={index === currentIndex}
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
  transition: all 0.3s;
`;

export default Carousel;
