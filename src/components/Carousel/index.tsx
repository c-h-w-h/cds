import Center from '@components-layout/Center';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';
import { useState } from 'react';

type CarouselProps = {
  itemList: { img?: string; content?: string }[];
};

const Carousel = ({ itemList }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <CarouselWrapper>
      <Slider>
        <Center>
          <NavigationButton
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0 ? true : false}
          >
            {'〈'}
          </NavigationButton>
        </Center>
        <ItemList>
          {itemList.map((item) => (
            <Item
              currentItem={(-100 / itemList.length) * currentIndex * 5}
              key={JSON.stringify(item)}
            >
              <ItemView>{item.content}</ItemView>
            </Item>
          ))}
        </ItemList>
        <Center>
          <NavigationButton
            onClick={() => setCurrentIndex(currentIndex + 1)}
            disabled={currentIndex === itemList.length - 1 ? true : false}
          >
            {'〉'}
          </NavigationButton>
        </Center>
      </Slider>
      <Center>
        {itemList.map((item, index) => (
          <Dot key={JSON.stringify(item)} current={index === currentIndex} />
        ))}
      </Center>
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
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div<{ currentItem: number }>`
  display: inline-block;
  scroll-snap-align: start;
  width: min-content;
  transform: translateX(${({ currentItem }) => currentItem}%);
  transition: transform 0.5s;
`;

const ItemView = styled.div`
  display: flex;
  width: 10rem;
  height: 15rem;
  border-radius: 10px;
  padding: 5px;
  margin-right: ${pixelToRem('20px')};
  transform: translateX(${pixelToRem('10px')});
  background-color: ${({ theme }) => theme.color.white};
`;

const NavigationButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 1.5rem;
  @media (hover: hover) {
    &:enabled:hover {
      filter: brightness(0.9);
      cursor: pointer;
    }
  }
  &:enabled:active {
    filter: brightness(0.7);
  }
  &:disabled {
    opacity: 0;
  }
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
