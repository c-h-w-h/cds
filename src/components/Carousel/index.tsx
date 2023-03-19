import Center from '@components-layout/Center';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';
import { useState } from 'react';

import LargeCards from './LargeCards';
import NavigationButton from './NavigationButton';
import SmallCards from './SmallCards';

type CarouselProps = {
  itemList: { img?: string; content?: string }[];
  size?: 'small' | 'large';
};

const Carousel = ({ itemList, size = 'large' }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex =
    size === 'small' ? Math.ceil(itemList.length / 2) - 1 : itemList.length - 1;
  return (
    <CarouselWrapper>
      <Slider>
        <NavigationButton
          clickHandler={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          {'〈'}
        </NavigationButton>
        {size === 'large' ? (
          <LargeCards {...{ itemList, currentIndex }} />
        ) : (
          <SmallCards {...{ itemList, currentIndex }} />
        )}
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
            <Dot key={JSON.stringify(item)} current={index === currentIndex} />
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

const Dot = styled.div<{ current: boolean }>`
  background: ${({ theme, current }) =>
    current ? theme.color.primary100 : theme.color.gray100};
  border-radius: 100%;
  height: ${pixelToRem('8px')};
  width: ${pixelToRem('8px')};
  transition: all 0.3s;
`;

export default Carousel;
