import Center from '@components/@layout/Center';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

type CarouselProps = {
  itemList: ReactNode[];
};

const Carousel = ({ itemList }: CarouselProps) => {
  return (
    <CarouselWrapper>
      <Center>
        <NavigationButton>{'<'}</NavigationButton>
      </Center>
      <ItemList>
        {itemList.map((item) => (
          <Item key={JSON.stringify(item)}>
            <ItemView>{item}</ItemView>
          </Item>
        ))}
      </ItemList>
      <Center>
        <NavigationButton>{'>'}</NavigationButton>
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

const Item = styled.div`
  display: inline-block;
  scroll-snap-align: start;
  width: min-content;
  &:last-child {
    padding-right: 20px;
  }
`;

const ItemView = styled.div`
  display: flex;
  width: 10rem;
  height: 15rem;
  border: 1px solid ${({ theme }) => theme.color.black};
  margin-right: 20px;
  transform: translateX(20px);
`;

const NavigationButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 2rem;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      filter: brightness(0.9);
    }
  }
  &:active {
    filter: brightness(0.7);
  }
`;

export default Carousel;
