import Typography from '@components/Typography';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';

type LargeCardProps = {
  item: { img?: string; content?: string };
};

const LargeCards = ({ item }: LargeCardProps) => {
  return (
    <ItemView>
      {item.img && <img src={item.img} alt="Item" />}
      <Typography variant="body">{item.content ? item.content : ''}</Typography>
    </ItemView>
  );
};

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
