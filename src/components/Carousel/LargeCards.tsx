import Typography from '@components/Typography';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';
import { useEffect, useRef } from 'react';

type LargeCardProps = {
  itemList: { img?: string; content?: string }[];
  currentIndex: number;
};

const LargeCards = ({ itemList, currentIndex }: LargeCardProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo(currentIndex * 180, 0);
  }, [currentIndex]);
  return (
    <ItemList ref={scrollRef}>
      {itemList.map((item) => (
        <Item key={JSON.stringify(item)}>
          <ItemView>
            {item.img && <img src={item.img} alt="Item" />}
            <Typography variant="body">
              {item.content ? item.content : ''}
            </Typography>
          </ItemView>
        </Item>
      ))}
    </ItemList>
  );
};

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
  scroll-behavior: smooth;
`;

const ItemView = styled.div`
  display: flex;
  flex-direction: column;
  width: 10rem;
  height: 13rem;
  margin-right: ${pixelToRem('20px')};
  transform: translateX(${pixelToRem('10px')});
  background-color: ${({ theme }) => theme.color.white};
  img {
    width: 100%;
    height: 10rem;
    border: 1px solid ${({ theme }) => theme.color.gray100};
    border-radius: 10px;
    margin-bottom: 10px;
  }
  p {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export default LargeCards;
