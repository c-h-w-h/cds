import Typography from '@components/Typography';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';

type SmallCardsProps = {
  firstItem: { img?: string; content?: string };
  secondItem: { img?: string; content?: string } | undefined;
};

const SmallCards = ({ firstItem, secondItem }: SmallCardsProps) => (
  <>
    <ItemView>
      {firstItem.img && <img src={firstItem.img} alt="Item" />}
      <Typography variant="body">
        {firstItem.content ? firstItem.content : ''}
      </Typography>
    </ItemView>
    <ItemView>
      {secondItem?.img && <img src={secondItem.img} alt="Item" />}
      <Typography variant="body">
        {secondItem?.content ? secondItem.content : ''}
      </Typography>
    </ItemView>
  </>
);

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
