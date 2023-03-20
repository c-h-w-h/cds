import Typography from '@components/Typography';
import { CAROUSEL_SLIDE } from '@constants/carouselSlide';
import styled from '@emotion/styled';
import { pixelToRem } from '@utils/pixelToRem';

type LargeCardProps = {
  item: { img?: string; content?: string };
};

const { WIDTH, HEIGHT, GAP } = CAROUSEL_SLIDE.large;

const LargeCards = ({ item }: LargeCardProps) => (
  <ItemView>
    {item.img && <img src={item.img} alt="Item" />}
    <Typography variant="body">{item.content ? item.content : ''}</Typography>
  </ItemView>
);

const ItemView = styled.div`
  display: flex;
  flex-direction: column;
  width: ${pixelToRem(`${WIDTH}px`)};
  height: ${pixelToRem(`${HEIGHT}px`)};
  margin-right: ${pixelToRem(`${GAP}px`)};
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
