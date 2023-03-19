import Center from '@components/@layout/Center';
import Icon from '@components/Icon';
import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';

type CarouselProps = {
  itemList: ReactNode[];
};

const Carousel = ({ itemList }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <CarouselWrapper>
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
            <ItemView>{item}</ItemView>
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
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.div`
  overflow: hidden;
  display: flex;
  margin: 0px 10px;
`;

const ItemList = styled.div`
  overflow-x: scroll;
  width: 100%;
  vertical-align: top;
  display: inline-flex;
  padding-top: 20px;
  padding-bottom: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div<{ currentItem: number }>`
  display: inline-block;
  scroll-snap-align: start;
  width: min-content;
  transform: translateX(${({ currentItem }) => currentItem}%);
  transition: transform 0.7s;
`;

const ItemView = styled.div`
  display: flex;
  width: 10rem;
  height: 15rem;
  border: 1px solid ${({ theme }) => theme.color.black};
  margin-right: 20px;
  transform: translateX(10px);
`;

const NavigationButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 2rem;
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

export default Carousel;
