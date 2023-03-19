import Typography from '@components/Typography';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';

type SmallCardsProps = {
  itemList: { img?: string; content?: string }[];
};

const SmallCards = ({ itemList }: SmallCardsProps) => {
  return (
    <ItemList>
      {itemList.map((item, index) => {
        if (index % 2 === 1) return;
        const secondItem = itemList.at(index + 1) ? itemList.at(index + 1) : {};
        return (
          <Item key={JSON.stringify(item)}>
            <ItemView>
              {item.img && <img src={item.img} alt="Item" />}
              <Typography variant="body">
                {item.content ? item.content : ''}
              </Typography>
            </ItemView>
            <ItemView>
              {secondItem?.img && (
                <img src={itemList[index + 1].img} alt="Item" />
              )}
              <Typography variant="body">
                {secondItem?.content ? secondItem.content : ''}
              </Typography>
            </ItemView>
          </Item>
        );
      })}
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

const Item = styled.div`
  display: inline-block;
  width: min-content;
  transition: transform 0.5s;
`;

const ItemView = styled.div`
  display: flex;
  flex-direction: column;
  width: 7rem;
  height: 10rem;
  margin-right: ${pixelToRem('20px')};
  margin-bottom: ${pixelToRem('10px')};
  transform: translateX(${pixelToRem('10px')});
  background-color: ${({ theme }) => theme.color.white};
  img {
    width: 100%;
    height: 7rem;
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

export default SmallCards;
