import Typography from '@components/Typography';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';

type LargeCardProps = {
  itemList: { img?: string; content?: string }[];
  currentIndex: number;
};

const LargeCards = ({ itemList, currentIndex }: LargeCardProps) => {
  return (
    <ItemList>
      {itemList.map((item) => (
        <Item xPosition={-100 * currentIndex} key={JSON.stringify(item)}>
          <ItemView>
            {item.img && <img src={item.img} alt="Item" />}
            <Typography variant="body">
              {item.content ? item.content : ''}
              {(-100 / itemList.length) * currentIndex * 4}
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
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div<{ xPosition: number }>`
  display: inline-block;
  width: min-content;
  transform: translateX(${({ xPosition }) => xPosition}%);
  transition: transform 0.5s;
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
